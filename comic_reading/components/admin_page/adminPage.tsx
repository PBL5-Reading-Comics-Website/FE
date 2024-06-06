import React, { useState } from 'react';
import { AdminMangaTable, AdminUserTable, WaitingListTable, AdminReportTable } from './table/table';
import { authService } from '../../src/service/authService';
import { Link, useNavigate } from 'react-router-dom';
import { AdminChapterTable } from './table/table'; // Import AdminChapterTable

function AdminPage() {
  const [selectedTable, setSelectedTable] = useState('user');
  const navigate = useNavigate();
  const [mangaId, setMangaId] = useState(0); // State to store manga ID for chapter table

  const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTable(event.target.value);
  };

  const logoutHandle = async () => {
    const response = await authService.logout();
    navigate('/');
  };

  const handleMangaIdChange = (id: number) => {
    setMangaId(id); // Update mangaId state when manga is selected
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 h-full w-full">
      {/* Header */}
      <header className="bg-gray-900 text-white flex items-center justify-between w-full px-4 py-3 fixed top-0 z-10">
        <Link to="/admin-page" className=''>
          <div className='ml-2 flex'>

            <h1 className="text-4xl font-bold text-center text-white">Admin</h1>
            <h1 className="text-4xl font-bold text-center text-orange-500 ">Page</h1>

          </div>
        </Link>
        <select className="bg-gray-900 border-2 text-center border-orange-500 rounded-full mt-2 p-2" onChange={handleSelectionChange}>
          <option value="user">Bảng người dùng</option>
          <option value="manga">Bảng truyện</option>
          <option value="waiting">Bảng chờ</option>
          <option value="report">Bảng báo cáo</option>
        </select>
        <button onClick={logoutHandle} className='text-4xl font-semibold bg-gray-900  text-center text-orange-500 p-1'>
          Logout
        </button>
      </header>

      <div className="bg-gray-900 text-white overflow-auto h-full w-full mt-16 p-4">
        {selectedTable === 'user' && (
          <div className="min-h-[calc(100vh-16px)]">
            <AdminUserTable />
          </div>
        )}
        {selectedTable === 'manga' && (
          <div className="min-h-[calc(100vh-16px)]">
            <AdminMangaTable />
          </div>
        )}
        {selectedTable === 'waiting' && (
          <div className="min-h-[calc(100vh-16px)]">
            <WaitingListTable />
          </div>
        )}
        {selectedTable === 'report' && (
          <div className="min-h-[calc(100vh-16px)]">
            <AdminReportTable />
          </div>
        )}
        {selectedTable === 'chapter' && mangaId > 0 && ( // Render Chapter table only if mangaId is valid
          <div className="min-h-[calc(100vh-16px)]">
            <AdminChapterTable mangaId={mangaId} /> {/* Pass mangaId to AdminChapterTable */}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPage;