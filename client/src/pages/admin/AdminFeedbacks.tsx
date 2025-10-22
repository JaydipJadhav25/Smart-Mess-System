import AdminLayout from "@/components/admin/AdminLayout"
import FeedbackAnalysis from "@/components/admin/FeedbackAnalysis"


function AdminFeedbacks() {
  return (
    <AdminLayout currentPage="feedbacks">
     <FeedbackAnalysis/>
    </AdminLayout>
  )
}

export default AdminFeedbacks