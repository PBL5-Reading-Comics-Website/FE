import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mangaService } from '../../../src/service/mangaService';
import { userService } from '../../../src/service/userService';
import { adminService } from '../../../src/service/adminService';
import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from '@mui/material'
import { UpdateUserDialog } from '../../util/updateUserDialog'
import styled from '@emotion/styled';

// Interfaces for Data
interface Manga {
  id: number;
  name: string;
  author: string;
  artist: string;
  coverImage: string;
  status: string;
  viewNumber: number;
  favouriteNumber: number;
  commentNumber: number;
  publishAt: string;
  updateAt: string | null;
  updateUser: string | null;
}

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
  authorities: { authority: string }[];
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
}

interface Chapter {
  id: number;
  name: string;
  number: number;
  commentNumber: number;
  publishAt: string;
  updateAt: string;
}

interface WaitingListItem {
  id: number;
  user: {
    id: number;
    username: string;
    name: string;
    email: string;
    registrationDate: string;
    role: string;
  };
}

interface ReportItem {
  id: number;
  content: string;
  status: string;
  manga: {
    id: number;
    name: string;
    author: string;
    artist: string;
    coverImage: string;
    status: string;
    viewNumber: number;
    favouriteNumber: number;
    commentNumber: number;
    publishAt: string;
    updateAt: string;
    updateUser: number;
  };
  comment: {
    id: number;
    content: string;
    createAt: string;
    updateAt: string;
    replyId: number | null;
    user: {
      id: number;
      username: string;
      name: string;
      email: string;
      registrationDate: string;
      role: string;
    };
  };
}

// Styled Dialog Component
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-container': {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  '& .MuiDialog-paper': {
    backgroundColor: '#4B4B4B',
    border: '2px solid #6A6A6A',
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
}));

// Confirmation Dialog Component
interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  title: string;
  content: string;
  acceptButtonText: string;
  cancelButtonText: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isOpen, onClose, onAccept, title, content, acceptButtonText, cancelButtonText }) => {
  const [isAccepting, setIsAccepting] = useState(false);

  const handleAccept = () => {
    setIsAccepting(true);
    onAccept();
  };

  return (
    <StyledDialog open={isOpen} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent><p>{content}</p></DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" style={{ backgroundColor: '#ED1B1B', color: 'white' }}>{cancelButtonText}</Button>
        <Button disabled={isAccepting} onClick={handleAccept} variant="contained" style={{ backgroundColor: '#ED741B', color: 'white' }}>
          {isAccepting ? 'Đang xử lý...' : acceptButtonText}
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

// Admin Manga Table
function AdminMangaTable() {
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isConfirmDeleteMangaOpen, setIsConfirmDeleteMangaOpen] = useState(false);
  const [mangaToDeleteId, setMangaToDeleteId] = useState(0);

  useEffect(() => {
    const fetchMangas = async () => {
      try {
        const response = await mangaService.getAllMangas({ page: currentPage });
        setMangas(response.data);
        setCurrentPage(response.meta.currentPage);
        setTotalPages(response.meta.totalPage);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMangas();
  }, [currentPage]);

  const handleDeleteManga = (id: number) => {
    setMangaToDeleteId(id);
    setIsConfirmDeleteMangaOpen(true);
  };

  const confirmDeleteManga = async () => {
    try {
      await adminService.deleteMangaById(mangaToDeleteId);
      setMangas(mangas.filter(manga => manga.id !== mangaToDeleteId));
    } catch (error) {
      console.error('Error deleting manga:', error);
    }
    finally{
      setIsConfirmDeleteMangaOpen(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white overflow-auto h-full w-full">
      <table className="divide-y divide-orange-500 mx-auto my-8">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Tên</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Tác giả</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Họa sĩ</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Trạng thái</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Lượt đọc</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Lượt thích</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Lượt bình luận</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Đăng ngày</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Cập nhật ngày</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Xóa</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-orange-500">
          {mangas.map((manga) => (
            <tr key={manga.id}>
              <td className="px-6 py-4 whitespace-nowrap">{manga.id}</td>
              <Link to={`/admin-manga-page/${manga.id}`} >
                <td className="px-6 py-4 whitespace-nowrap">{manga.name}</td>
              </Link>
              <td className="px-6 py-4 whitespace-nowrap">{manga.author}</td>
              <td className="px-6 py-4 whitespace-nowrap">{manga.artist}</td>
              <td className="px-6 py-4 whitespace-nowrap">{manga.status}</td>
              <td className="px-6 py-4 whitespace-nowrap">{manga.viewNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap">{manga.favouriteNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap">{manga.commentNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap">{manga.publishAt}</td>
              <td className="px-6 py-4 whitespace-nowrap">{manga.updateAt}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={() => handleDeleteManga(manga.id)} className="mx-1 px-4 py-2 rounded-md text-white bg-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center items-center m-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`mx-1 px-4 py-2 rounded-md text-white ${currentPage === i + 1 ? 'bg-orange-500' : 'bg-gray-700'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <ConfirmationDialog
        isOpen={isConfirmDeleteMangaOpen}
        onClose={() => setIsConfirmDeleteMangaOpen(false)}
        onAccept={confirmDeleteManga}
        title="Xác nhận xóa truyện"
        content="Bạn có chắc chắn muốn xóa truyện này?"
        acceptButtonText="Xóa"
        cancelButtonText="Hủy"
      />
    </div>
  );
}

// Admin User Table
function AdminUserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isConfirmDeleteUserOpen, setIsConfirmDeleteUserOpen] = useState(false);
  const [userToDeleteId, setUserToDeleteId] = useState(0);
  const [isUpdateUserDialogOpen, setIsUpdateUserDialogOpen] = useState(false);
  const [userToUpdateId, setUserToUpdateId] = useState<number | null>(null);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userService.getAllUsers(); // Pass currentPage to the service
        setUsers(data.data);
        setTotalPages(data.meta.totalPage); // Assuming the response structure
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, [currentPage, isChanged]);

  const handleDeleteUser = (id: number) => {
    setUserToDeleteId(id);
    setIsConfirmDeleteUserOpen(true);
  };

  const confirmDeleteUser = async () => {
    try {
      await adminService.deleteUserById(userToDeleteId);
      setIsChanged(!isChanged);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
    finally {
      setIsConfirmDeleteUserOpen(false);
    }
  };

  const handleUpdateUser = (userId: number) => {
    setUserToUpdateId(userId);
    setIsUpdateUserDialogOpen(true);
  };

  const handleCloseUpdateUserDialog = () => {
    setIsUpdateUserDialogOpen(false);
    setUserToUpdateId(null);
  };

  const handleUserUpdateSuccess = () => {
    setIsChanged(!isChanged);
  };

  return (
    <div className="bg-gray-900 text-white w-full overflow-auto">
      <table className="divide-y divide-orange-500 mx-auto my-8">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Tên người dùng</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Tên hiển thị</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Ngày sinh</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Giới tính</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Ngày đăng ký</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Quyền</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Enabled</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Cập nhật</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Xóa</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-orange-500">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.dateOfBirth}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.gender ? 'Nam' : 'Nữ'}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.registrationDate}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.enabled ? 'Có' : 'Không'}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleUpdateUser(user.id)}
                  className="mx-1 px-4 py-2 rounded-md text-white bg-blue-500"
                >
                  Update
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={() => handleDeleteUser(user.id)} className="mx-1 px-4 py-2 rounded-md text-white bg-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center items-center m-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`mx-1 px-4 py-2 rounded-md text-white ${currentPage === i + 1 ? 'bg-orange-500' : 'bg-gray-700'}`}
          >
            {i + 1}
          </button>
        ))}

      </div>
      <ConfirmationDialog
        isOpen={isConfirmDeleteUserOpen}
        onClose={() => setIsConfirmDeleteUserOpen(false)}
        onAccept={confirmDeleteUser}
        title="Xác nhận xóa người dùng"
        content="Bạn có chắc chắn muốn xóa người dùng này?"
        acceptButtonText="Xóa"
        cancelButtonText="Hủy"
      />
      <UpdateUserDialog
        open={isUpdateUserDialogOpen}
        onClose={handleCloseUpdateUserDialog}
        userId={userToUpdateId}
        onUpdateSuccess={handleUserUpdateSuccess}
      />
    </div>
  );
}

// Admin Chapter Table
interface AdminChapterTableProps {
  mangaId: number;
}

function AdminChapterTable({ mangaId }: AdminChapterTableProps) {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [isConfirmDeleteChapterOpen, setIsConfirmDeleteChapterOpen] = useState(false);
  const [chapterToDeleteId, setChapterToDeleteId] = useState(0);

  useEffect(() => {
    const fetchMangas = async () => {
      try {
        const response = await mangaService.getMangaById(mangaId);
        setChapters(response.data.chapters);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMangas();
  }, []);

  const handleDeleteChapter = (id: number) => {
    setChapterToDeleteId(id);
    setIsConfirmDeleteChapterOpen(true);
  };

  const confirmDeleteChapter = async () => {
    try {
      // await mangaService.deleteChapter(chapterToDeleteId);
      // setChapters(chapters.filter(chapter => chapter.id !== chapterToDeleteId));
      // setIsConfirmDeleteChapterOpen(false);
    } catch (error) {
      console.error('Error deleting chapter:', error);
    }
  };

  return (
    <div className="bg-gray-900 text-white overflow-auto h-full w-full">
      <table className="divide-y divide-orange-500 mx-auto my-8">
        <thead >
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Tên</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Lượt bình luận</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Đăng ngày</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Cập nhật ngày</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Cập nhật</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Xóa</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-orange-500">
          {chapters.map((chapter) => (
            <tr key={chapter.id}>
              <td className="px-6 py-4 whitespace-nowrap">{chapter.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{chapter.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{chapter.commentNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap">{chapter.publishAt}</td>
              <td className="px-6 py-4 whitespace-nowrap">{chapter.updateAt}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={() => { }} className="mx-1 px-4 py-2 rounded-md text-white bg-blue-500">Update</button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={() => handleDeleteChapter(chapter.id)} className="mx-1 px-4 py-2 rounded-md text-white bg-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmationDialog
        isOpen={isConfirmDeleteChapterOpen}
        onClose={() => setIsConfirmDeleteChapterOpen(false)}
        onAccept={confirmDeleteChapter}
        title="Xác nhận xóa chương"
        content="Bạn có chắc chắn muốn xóa chương này?"
        acceptButtonText="Xóa"
        cancelButtonText="Hủy"
      />
    </div>
  );
}

// Waiting List Table
function WaitingListTable() {
  const [waitingList, setWaitingList] = useState<WaitingListItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isConfirmAcceptUserOpen, setIsConfirmAcceptUserOpen] = useState(false);
  const [userIdToAccept, setUserIdToAccept] = useState(0);
  const [isConfirmRejectUserOpen, setIsConfirmRejectUserOpen] = useState(false);
  const [userIdToReject, setUserIdToReject] = useState(0);

  useEffect(() => {
    const fetchWaitingList = async () => {
      try {
        const response = await adminService.getWaitingList();
        setWaitingList(response.data);
        setCurrentPage(response.meta.currentPage);
        setTotalPages(response.meta.totalPage);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWaitingList();
  }, [currentPage]);

  const handleAcceptUser = (id: number) => {
    setUserIdToAccept(id);
    setIsConfirmAcceptUserOpen(true);
  };

  const confirmAcceptUser = async () => {
    try {
      await adminService.acceptWaiting(userIdToAccept);
      setWaitingList(waitingList.filter(item => item.user.id !== userIdToAccept));
      setIsConfirmAcceptUserOpen(false);
    } catch (error) {
      console.error('Error accepting user:', error);
    }
  };

  const handleRejectUser = (id: number) => {
    setUserIdToReject(id);
    setIsConfirmRejectUserOpen(true);
  };

  const confirmRejectUser = async () => {
    try {
      await adminService.rejectWaiting(userIdToReject);
      setWaitingList(waitingList.filter(item => item.user.id !== userIdToReject));
      setIsConfirmRejectUserOpen(false);
    } catch (error) {
      console.error('Error rejecting user:', error);
    }
  };

  return (
    <div className="bg-gray-900 text-white overflow-auto h-full w-full">
      <table className="divide-y divide-orange-500 mx-auto my-8">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Tên người dùng</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Tên hiển thị</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Ngày đăng ký</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Chấp nhận</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Từ chối</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-orange-500">
          {waitingList.map((item) => (
            <tr key={item.user.id}>
              <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.user.username}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.user.registrationDate}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={() => handleAcceptUser(item.user.id)} className="mx-1 px-4 py-2 rounded-md text-white bg-green-500">Chấp nhận</button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={() => handleRejectUser(item.user.id)} className="mx-1 px-4 py-2 rounded-md text-white bg-red-500">Từ chối</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center items-center m-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`mx-1 px-4 py-2 rounded-md text-white ${currentPage === i + 1 ? 'bg-orange-500' : 'bg-gray-700'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <ConfirmationDialog
        isOpen={isConfirmAcceptUserOpen}
        onClose={() => setIsConfirmAcceptUserOpen(false)}
        onAccept={confirmAcceptUser}
        title="Xác nhận chấp nhận"
        content="Bạn có chắc chắn muốn chấp nhận người dùng này?"
        acceptButtonText="Chấp nhận"
        cancelButtonText="Hủy"
      />
      <ConfirmationDialog
        isOpen={isConfirmRejectUserOpen}
        onClose={() => setIsConfirmRejectUserOpen(false)}
        onAccept={confirmRejectUser}
        title="Xác nhận từ chối"
        content="Bạn có chắc chắn muốn từ chối người dùng này?"
        acceptButtonText="Từ chối"
        cancelButtonText="Hủy"
      />
    </div>
  );
}

// Admin Report Table
function AdminReportTable() {
  const [reportData, setReportData] = useState<ReportItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isConfirmApproveReportOpen, setIsConfirmApproveReportOpen] = useState(false);
  const [reportIdToApprove, setReportIdToApprove] = useState(0);
  const [isConfirmRejectReportOpen, setIsConfirmRejectReportOpen] = useState(false);
  const [reportIdToReject, setReportIdToReject] = useState(0);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await adminService.getAllReports({ page: currentPage, size: 10, sortOrder: 'desc' });
        setReportData(response.data);
        setCurrentPage(response.meta.currentPage);
        setTotalPages(response.meta.totalPage);
      } catch (error) {
        console.error('Error fetching report data:', error);
      }
    };
    fetchReportData();
  }, [currentPage]);

  const handleApproveReport = (id: number) => {
    setReportIdToApprove(id);
    setIsConfirmApproveReportOpen(true);
  };

  const confirmApproveReport = async () => {
    try {
      await adminService.approveReport(reportIdToApprove);
      setReportData(reportData.filter(item => item.id !== reportIdToApprove));
      setIsConfirmApproveReportOpen(false);
    } catch (error) {
      console.error('Error approving report:', error);
    }
  };

  const handleRejectReport = (id: number) => {
    setReportIdToReject(id);
    setIsConfirmRejectReportOpen(true);
  };

  const confirmRejectReport = async () => {
    try {
      await adminService.rejectReport(reportIdToReject);
      setReportData(reportData.filter(item => item.id !== reportIdToReject));
      setIsConfirmRejectReportOpen(false);
    } catch (error) {
      console.error('Error rejecting report:', error);
    }
  };

  return (
    <div className="bg-gray-900 text-white overflow-auto h-full w-full">
      <table className="divide-y divide-orange-500 mx-auto my-8">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Content</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Manga Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Author</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Comment User</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Comment Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Approve</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Reject</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-orange-500">
          {reportData.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.content}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.status}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.manga.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.manga.author}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.comment.user.username}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.comment.createAt}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={() => handleApproveReport(item.id)} className="mx-1 px-4 py-2 rounded-md text-white bg-green-500">Approve</button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={() => handleRejectReport(item.id)} className="mx-1 px-4 py-2 rounded-md text-white bg-red-500">Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center items-center m-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`mx-1 px-4 py-2 rounded-md text-white ${currentPage === i + 1 ? 'bg-orange-500' : 'bg-gray-700'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <ConfirmationDialog
        isOpen={isConfirmApproveReportOpen}
        onClose={() => setIsConfirmApproveReportOpen(false)}
        onAccept={confirmApproveReport}
        title="Xác nhận chấp nhận báo cáo"
        content="Bạn có chắc chắn muốn chấp nhận báo cáo này?"
        acceptButtonText="Chấp nhận"
        cancelButtonText="Hủy"
      />
      <ConfirmationDialog
        isOpen={isConfirmRejectReportOpen}
        onClose={() => setIsConfirmRejectReportOpen(false)}
        onAccept={confirmRejectReport}
        title="Xác nhận từ chối báo cáo"
        content="Bạn có chắc chắn muốn từ chối báo cáo này?"
        acceptButtonText="Từ chối"
        cancelButtonText="Hủy"
      />
    </div>
  );
}

export { AdminMangaTable, AdminUserTable, AdminChapterTable, WaitingListTable, AdminReportTable };