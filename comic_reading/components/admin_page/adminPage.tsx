import { AdminMangaTable, AdminUserTable } from './table/table';
function AdminPage() {

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <AdminUserTable />
        <AdminMangaTable />
    </div>
  );
}

export default AdminPage;