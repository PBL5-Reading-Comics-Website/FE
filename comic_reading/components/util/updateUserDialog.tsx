import React, { useState, useEffect } from 'react';
import { authService } from '../../src/service/authService.tsx';
import { userService } from '../../src/service/userService.tsx';
import { DateTimeInput, Input, SelectInput } from '../util/input.tsx';
import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from '@mui/material';
import styled from '@emotion/styled';

interface User {
  id: number;
  username: string;
  password: string;
  name: string;
  dateOfBirth: string;
  gender: boolean;
  email: string;
  avatar: string;
  registrationDate: string;
  role: string;
  enabled: boolean;
  accountNonLocked: boolean;
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
  authorities: Array<{ authority: string }>;
}

interface UpdateUserDialogProps {
  open: boolean;
  onClose: () => void;
  userId: number | null;
  onUpdateSuccess: () => void; 
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-container': {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  '& .MuiDialog-paper': {
    backgroundColor: '#4B4B4B',
    border: '2px solid #6A6A6A',
    width: '500px', // Adjust dialog width as needed
  },
  '& .MuiDialogTitle-root': {
    color: '#ED1B1B',
    textAlign: 'center',
  },
  '& .MuiDialogContent-root': {
    color: 'white',
    textAlign: 'center',
  },
  '& .MuiDialogActions-root': {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px 24px',
  },
  '& .MuiButton-contained': {
    borderRadius: '10px',
    width: '120px',
  },
  // Additional styles for input fields and labels inside the dialog
  '& .MuiInputLabel-root': {
    color: 'white', 
  },
  '& .MuiInputBase-root': { 
    backgroundColor: '#929292', 
    color: 'white', 
    borderRadius: '5px', 
  },
  '& .MuiInput-underline:before, & .MuiInput-underline:after': {
    borderBottom: 'none !important', 
  },
}));


const UpdateUserDialog: React.FC<UpdateUserDialogProps> = ({ open, onClose, userId, onUpdateSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState<string | null>(null);
  const [gender, setGender] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        setIsLoading(true);
        try {
          const response = await userService.getUserById(userId);
          if (response.status === 'success') {
            setUser(response.data);
            setUsername(response.data.username);
            setEmail(response.data.email);
            setName(response.data.name);
            setDob(response.data.dateOfBirth);
            setGender(response.data.gender ? 'Nam' : 'Nữ');
          } else {
            console.error('Error fetching user:', response.message);
          }
        } catch (error) {
          console.error('Error fetching user:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUser();
  }, [userId, open]);

  const handleUpdate = async () => {
    if (!userId) return;

    setIsLoading(true); 

    try {
      const updatedUser = await authService.updateInfo({
        id: userId.toString(),
        username,
        dob: dob || '', 
        name,
        gender: gender === 'Nam', 
        email,
      });

      if (updatedUser.status === "success") {
        alert("Cập nhật thông tin thành công");
        onUpdateSuccess(); 
        onClose(); 
      } else {
        console.error('Error updating user:', updatedUser.message); 
      }
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setIsLoading(false); 
    }
  };

  const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
  };

  const handleUploadImage = async () => {
    if (!userId) return; 

    if (imageUrl) {
      try {
        const response = await userService.updateUserImage(userId, imageUrl);
        if (response.status === 'success') {
          alert('Ảnh đại diện đã được cập nhật');
          onUpdateSuccess(); 
          onClose(); 
        } else {
          console.error('Error updating image:', response.message); 
        }
      } catch (error) {
        console.error('Error updating image:', error);
      }
    } else {
      alert('Vui lòng nhập URL hình ảnh');
    }
  };

  return (
    <StyledDialog open={open} onClose={onClose}>
      <DialogTitle>Cập nhật thông tin người dùng</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <p>Loading...</p>
        ) : user ? (
          <div className="flex flex-col items-center"> 
            <div className="mb-4">
              {imageUrl ? ( 
                <img
                  src={imageUrl}
                  alt="User Avatar"
                  className="w-24 h-24 rounded-full"
                />
              ) : user.avatar ? ( 
                <img
                  src={user.avatar}
                  alt="User Avatar"
                  className="w-24 h-24 rounded-full"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-400"></div> 
              )}
            </div>
            <div className="mb-2 w-full"> 
              <label className="block text-sm font-bold mb-1" htmlFor="username">
                Tên hiển thị
              </label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled 
                className="w-full h-10"
              />
            </div>
            <div className="mb-2 w-full"> 
              <label className="block text-sm font-bold mb-1" htmlFor="email">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10"
              />
            </div>
            <div className="mb-2 w-full"> 
              <label className="block text-sm font-bold mb-1" htmlFor="name">
                Họ và Tên
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-10"
              />
            </div>
            <div className="flex mb-2 w-full"> 
              <div className="w-1/2 pr-1">
                <label className="block text-sm font-bold mb-1" htmlFor="dob">
                  Ngày sinh
                </label>
                <DateTimeInput
                  id="dob"
                  value={dob ?? ''} 
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full h-10"
                />
              </div>
              <div className="w-1/2 pl-1">
                <label className="block text-sm font-bold mb-1" htmlFor="gender">
                  Giới tính
                </label>
                <SelectInput
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full h-10"
                  options={[
                    { value: 'Nam', label: 'Nam' },
                    { value: 'Nữ', label: 'Nữ' },
                  ]}
                />
              </div>
            </div>
            <div className="mb-2 w-full">
              <input
                type="text"
                value={imageUrl}
                onChange={handleImageUrlChange}
                placeholder="Nhập URL hình ảnh mới"
                className="bg-[#929292] text-white font-bold py-2 px-4 rounded cursor-pointer w-full" 
              />
            </div>
          </div>
        ) : (
          <p>Không tìm thấy người dùng</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" style={{ backgroundColor: '#ED1B1B', color: 'white' }}>
          Hủy
        </Button>
        <Button
          onClick={handleUpdate}
          variant="contained"
          style={{ backgroundColor: '#ED741B', color: 'white' }}
          disabled={isLoading} 
        >
          {isLoading ? 'Đang lưu...' : 'Lưu'}
        </Button>
        <Button
          onClick={handleUploadImage} 
          variant="contained"
          style={{ backgroundColor: '#ED741B', color: 'white' }}
          disabled={isLoading}
        >
          {isLoading ? 'Đang tải lên...' : 'Thay đổi ảnh'}
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export  {UpdateUserDialog};