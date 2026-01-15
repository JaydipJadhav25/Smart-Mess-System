// import useAuth from "@/components/context/useAuth"
import FeedbackForm from "@/components/feedback/FeedbackForm"
import StudentLayout from "@/components/students/StudentLayout"
import { useNavigate } from "react-router-dom";

function Feedback() {
   
  // const {isFormSubmitted} = useAuth();

  const navigate = useNavigate();
  return (
  
      <StudentLayout currentPage="feedback">
      <main className="flex-1 bg-background">
             {/* application form not sumitedd */}
         { localStorage.getItem("applicationSubmit") !== "true" && (
    <div className="flex flex-col items-center justify-center p-8 bg-amber-50 border border-amber-200 rounded-xl shadow-sm max-w-lg mx-auto">
      
      {/* Warning/Alert Icon */}
      <div className="flex items-center justify-center w-12 h-12 mb-4 bg-amber-100 rounded-full">
        <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="www.w3.org">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
      </div>

      <h1 className="text-xl font-bold text-gray-900 text-center mb-2">
        Admission Required
      </h1>
      
      <p className="text-sm text-gray-600 text-center leading-relaxed mb-6">
        This feature is exclusively available to registered mess members. It appears you haven't submitted your admission application yet.
      </p>

      {/* Primary Action Button */}
      <button 
        className="w-full px-6 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-sm"
        onClick={() => {
          navigate("/profile-form")
        }}
      >
        Complete Application Form
      </button>

      <p className="mt-4 text-xs text-gray-400">
        Already applied? Please wait for admin approval.
      </p>
    </div>
            )
          }
       <FeedbackForm/>
      </main>
      </StudentLayout>
    
  )
}

export default Feedback