import AdminLayout from "@/components/admin/AdminLayout";
import { ComingSoon } from "@/components/ComingSoon";

function AdminUpdateMenu() {
  return (
    <AdminLayout currentPage="MenuUpdate">
       <div className='flex justify-center items-center h-screen'>
             <ComingSoon/>
          </div>
    </AdminLayout>
  )
}

export default AdminUpdateMenu