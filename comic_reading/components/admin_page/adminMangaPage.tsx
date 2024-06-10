import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AdminChapterTable } from './table/table';

function AdminMangaPage() {
    const { id } = useParams();
    const [selectedTable, setSelectedTable] = useState('user');
    const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTable(event.target.value);
    };

    return (
        <div className="flex flex-col justify-center items-center bg-gray-900 h-full">
            <div className='absolute flex top-0 items-center justify-between w-full'>
                 <Link to="/admin-page" className=''>
                <div className='ml-2 flex'>
                    
                    <h1 className="text-4xl font-bold text-center text-white">Admin</h1>
                    <h1 className="text-4xl font-bold text-center text-orange-500 ">Page</h1>
                    
                </div>
                </Link>
                <button className='text-2xl font-semibold bg-gray-900  text-center text-orange-500 p-1'>
                    Logout
                </button>
            </div>

            <div className="absolute bg-gray-900 text-white h-full w-full top-16 z-0" /> 

            <div className="flex flex-col  h-full w-full mt-16 p-4 z-10"> 
                <div className="flex-grow">
                    <AdminChapterTable mangaId={ parseInt(id!)} /> 
                </div>
            </div>
        </div>
    );
}

export default AdminMangaPage;