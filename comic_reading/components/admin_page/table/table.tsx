import { useEffect, useState } from 'react';
import { mangaService } from '../../../src/service/mangaService';
import { userService } from '../../../src/service/userService';
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

function AdminMangaTable() {
    const [mangas, setMangas] = useState<Manga[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        const fetchMangas = async () => {
            try {
                const response = await mangaService.getAllMangas({ page: currentPage }); // Pass an object with the property 'page'
                setMangas(response.data);
                setCurrentPage(response.meta.currentPage);
                setTotalPages(response.meta.totalPage);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMangas();
    }, [currentPage]);

    const handleDelete = (id: number) => {
        // Filter out the manga with the given id
        const updatedMangas = mangas.filter(manga => manga.id !== id);
        // Update the state with the filtered mangas
        setMangas(updatedMangas);
    };

    const handleUpdate = (id: number) => {
        // Implement your update logic here
        console.log(`Update manga with id ${id}`);
    };

    return (
        <div className="bg-gray-900 text-white overflow-auto h-full w-full">
            <table className="divide-y divide-orange-500 mx-auto my-8">
                <thead >
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
                        <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Cập nhật</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Xóa</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-orange-500">
                    {mangas.map((manga) => (
                        <tr key={manga.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{manga.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{manga.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{manga.author}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{manga.artist}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{manga.status}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{manga.viewNumber}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{manga.favouriteNumber}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{manga.commentNumber}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{manga.publishAt}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{manga.updateAt}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button onClick={() => handleUpdate(manga.id)} className="mx-1 px-4 py-2 rounded-md text-white bg-blue-500">Update</button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button onClick={() => handleDelete(manga.id)} className="mx-1 px-4 py-2 rounded-md text-white bg-red-500">Delete</button>
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
        </div>
    );
}

export { AdminMangaTable };

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

function AdminUserTable() {
    const [users, setUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await userService.getAllUsers();
                setUsers(data.data);
                setCurrentPage(data.meta.currentPage);
                setTotalPages(data.meta.totalPage);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUsers();
    }, [currentPage]);

    const handleDelete = (id: number) => {
        const updatedUsers = users.filter(user => user.id !== id);
        setUsers(updatedUsers);
    };

    const handleUpdate = (id: number) => {
        console.log(`Update user with id ${id}`);
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
                            <td className="px-6 py-4 whitespace-nowrap">{user.gender ? 'Male' : 'Female'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{user.registrationDate}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{user.enabled ? 'Yes' : 'No'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button onClick={() => handleUpdate(user.id)} className="mx-1 px-4 py-2 rounded-md text-white bg-blue-500">Update</button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button onClick={() => handleDelete(user.id)} className="mx-1 px-4 py-2 rounded-md text-white bg-red-500">Delete</button>
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
        </div>
    );
}

export { AdminUserTable };

