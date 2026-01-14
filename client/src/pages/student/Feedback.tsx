import FeedbackForm from "@/components/feedback/FeedbackForm"
import StudentLayout from "@/components/students/StudentLayout"

function Feedback() {
  return (
  
      <StudentLayout currentPage="feedback">
      <main className="flex-1">
       <FeedbackForm/>
      </main>
      </StudentLayout>
    
  )
}

export default Feedback