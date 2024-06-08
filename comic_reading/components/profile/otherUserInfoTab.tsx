import { useEffect, useState } from 'react';
import { authService } from '../../src/service/authService.tsx';
import { userService } from '../../src/service/userService.tsx';
import { DateTimeInput, Input, SelectInput } from '../util/input.tsx';
import React from 'react';

interface UpdateUserInfoTabProps {
    avatarPath: string;
    user?: User;
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
    accountNonLocked: boolean;
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
    authorities: Array<{ authority: string }>;
}

export function OtherUserInfoTab({ avatarPath, user }: UpdateUserInfoTabProps) {
    const [isEditable, setIsEditable] = useState(false);
    const [username, setUsername] = useState(user?.username || '');
    const [email, setEmail] = useState(user?.email || '');
    const [name, setName] = useState(user?.name || '');
    const [dob, setDob] = useState(user?.dateOfBirth || null);
    const [gender, setGender] = useState(user?.gender ? 'Nam' : 'Nữ');
    const [imageUrl, setImageUrl] = useState<string>('');
    useEffect(() => {
        setUsername(user?.username ?? '');
        setEmail(user?.email ?? '');
        setName(user?.name ?? '');
        setDob(user?.dateOfBirth ?? null);
        setGender(user?.gender ? 'Nam' : 'Nữ');
        console.log(gender);
    }, [user]);
    return (
        <div className='pb-5'>
            <h2 className='text-bold my-4'>CẬP NHẬT THÔNG TIN CÁ NHÂN</h2>
            <div className="flex items-center">
                <div className="w-7/12">
                    <div className="mb-2">
                        <label className="block  text-sm font-bold mb-1" htmlFor="name">
                            Họ và Tên
                        </label>
                        <Input id="name" type="text" value={name} onChange={e => setName(e.target.value)} className={`h-10 ${!isEditable ? 'bg-gray-200' : ''}`} disabled />
                    </div>
                    <div className="mb-2">
                        <label className="block  text-sm font-bold mb-1" htmlFor="email">
                            Email
                        </label>
                        <Input id="email" type="email" onChange={e => setEmail(e.target.value)} value={email} className={`h-10 ${!isEditable ? 'bg-gray-200' : ''}`} disabled />
                    </div>
                    <div className="mb-2">
                        <label className="block  text-sm font-bold mb-1" htmlFor="username">
                            Tên hiển thị
                        </label>
                        <Input id="username" type="text" onChange={e => setUsername(e.target.value)} value={username} className={`h-10 ${!isEditable ? 'bg-gray-200' : ''}`} disabled={true} />
                    </div>
                    <div className="flex mb-2">
                        <div className="w-1/2 pr-1">
                            <label className="block text-sm font-bold mb-1" htmlFor="dob">
                                Ngày sinh
                            </label>
                            <DateTimeInput id="dob" value={dob ?? ''} onChange={e => setDob(e.target.value)} className={`h-10 ${!isEditable ? 'bg-gray-200' : ''}`} disabled />
                        </div>
                        <div className="w-1/2 pl-1">
                            <label className="block text-sm font-bold mb-1" htmlFor="gender">
                                Giới tính
                            </label>
                            <SelectInput id="gender" value={gender} onChange={e => setGender(e.target.value)} className={`h-10 ${!isEditable ? 'bg-gray-200' : ''}`} disabled options={[
                                { value: '', label: 'Chọn...' },
                                { value: 'Nam', label: 'Nam' },
                                { value: 'Nữ', label: 'Nữ' },
                            ]} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OtherUserInfoTab;