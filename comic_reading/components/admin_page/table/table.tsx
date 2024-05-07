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
    const itemsPerPage = 10;
    const dummyMangas: Manga[] = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        name: `Manga ${i + 1}`,
        author: `Author ${i + 1}`,
        artist: `Artist ${i + 1}`,
        coverImage: `Cover Image ${i + 1}`,
        status: `Status ${i + 1}`,
        readingStatus: `Reading Status ${i + 1}`,
        viewNumber: i + 1,
        favouriteNumber: i + 1,
        commentNumber: i + 1,
        publishAt: `Publish At ${i + 1}`,
        updateAt: `Update At ${i + 1}`,
        updateUser: `Update User ${i + 1}`,
    }));

    const mangasForCurrentPage = mangas.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const totalPages = Math.ceil(mangas.length / itemsPerPage);
    useEffect(() => {
        const fetchMangas = async () => {
            try {
                const data = await mangaService.getAllMangas();
                console.log(data);
                setMangas(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMangas();
    }, []);

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
        <div className="bg-gray-900 text-white w-10/12 overflow-auto rounded-xl">

            <table className="divide-y divide-orange-500 mx-auto my-8">
                <thead >
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Author</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Artist</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Reading Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">View Number</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Favourite Number</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Comment Number</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Publish At</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Update At</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Update User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-orange-500">
                    {mangasForCurrentPage.map((manga) => (
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
                            <td className="px-6 py-4 whitespace-nowrap">{manga.updateUser}</td>
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
            <div className="flex justify-end m-4">
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
    const itemsPerPage = 10;

    const usersForCurrentPage = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const totalPages = Math.ceil(users.length / itemsPerPage);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await userService.getAllUsers();
                console.log(data);
                setUsers(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = (id: number) => {
        const updatedUsers = users.filter(user => user.id !== id);
        setUsers(updatedUsers);
    };

    const handleUpdate = (id: number) => {
        console.log(`Update user with id ${id}`);
    };

    return (
        <div className="bg-gray-900 text-white w-9/12 overflow-auto rounded-xl">
            <table className="divide-y divide-orange-500 mx-auto my-8">
                <thead>
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Username</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Date of Birth</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Gender</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Registration Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Enabled</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Update User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-orange-500">
                    {usersForCurrentPage.map((user) => (
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
            <div className="flex justify-end m-4">
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

