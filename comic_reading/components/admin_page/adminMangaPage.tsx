import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AdminChapterTable } from './table/table';

function AdminMangaPage() {
    const { id } = useParams();
    const [selectedTable, setSelectedTable] = useState('user');
    const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTable(event.target.value);
    };

    return (
        <div className="flex flex-col justify-center items-center bg-gray-100 h-full">
            <div className='absolute flex top-0 items-center justify-between w-full'>
                <div className='ml-2 flex'>
                    <h1 className="text-4xl font-bold text-center">Admin</h1>
                    <h1 className="text-4xl font-bold text-center text-orange-500 ">Page</h1>
                </div>
                <button className='text-2xl font-semibold bg-gray-900  text-center text-orange-500 p-1'>
                    Logout
                </button>
            </div>
            <div className='h-10 w-full bg-gray-900'>
            </div>
            <AdminChapterTable mangaId={ parseInt(id!)} />
        </div>
    );
}

export default AdminMangaPage;