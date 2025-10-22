import { ThemeProvider } from "./hooks/theme-provider"
import Index from "./pages/Index"
import {Route ,  BrowserRouter, Routes}  from "react-router-dom"
import NotFound from "./pages/NotFound"
import Today from "./pages/Today"
import Menu from "./pages/Menu"
// import Feedback from "./pages/Feedback"
import Report from "./pages/Report"
import About from "./pages/About"
import UserSignup from "./pages/SignupFormData "
import LoginFormData from "./pages/LoginFormData"
import OtpVerification from "./pages/OtpVerification"
// import FeedbackForm from "./components/feedback/FeedbackForm"
// import FeedbackAnalysis from "./components/admin/FeedbackAnalysis"
// import AnalyticsDashboard from "./components/AnalyticsDashBoard/AnalyticsDashboard"
import { Toaster } from "sonner"
import { AuthProvider } from "./components/context/AuthContext"
import { AdminPanel } from "./pages/AdminPanel"
import AdminStudents from "./pages/admin/AdminStudents"
import AdminFeedbacks from "./pages/admin/AdminFeedbacks"
import AdminAnnouncements from "./pages/admin/AdminAnnouncements"
import AdminFinancials from "./pages/admin/AdminFinancials"
import { StudentPanel } from "./pages/StudentPanel"
import Feedback from "./pages/student/Feedback"
import StudentPlane from "./pages/student/StudentPlane"
import StudentForm from "./pages/student/StudentForm"


 const AppRouter = ()=>{
     return(
        <>
        <Routes>
          <Route path="/" element={<Index/>}/>
          <Route  path="/today" element={<Today/>}/>
          <Route  path="/menu" element={<Menu/>}/>
          {/* <Route  path="/feedback" element={<Feedback/>}/> */}
          <Route  path="/report" element={<Report/>}/>
          <Route  path="/about" element={<About/>}/>
          <Route path="/signup" element={<UserSignup/>}/>
          <Route path="/login" element={<LoginFormData/>}/>
          <Route path="/verification/:userEmail" element={<OtpVerification/>}/>
          {/* <Route path="/feedbackform" element={<FeedbackForm/>}/> */}

          {/* Stunndents routes */}
          <Route path="/profile" element={<StudentPanel/>}/>   
          <Route path="/profile/feedback" element={<Feedback/>}/>   
          <Route path="/profile/plane" element={<StudentPlane/>}/>   
          <Route path="/profile/form" element={<StudentForm/>}/>   




             {/* admin routes */}
          <Route path="/admin" element={<AdminPanel/>}/>   
          <Route path="/admin-students" element={<AdminStudents/>}/>   
          <Route path="/admin-feedback" element={<AdminFeedbacks/>}/>   
          <Route path="/admin-announcements" element={<AdminAnnouncements/>}/>   
          <Route path="/admin-financials" element={<AdminFinancials/>}/>   
        
        
          {/* <Route path="/ai" element={<FeedbackAnalysis/>}/> */}
          {/* <Route path="/dashbord" element={<AnalyticsDashboard/>}/> */}
          <Route path="*" element={<NotFound/>}/>
        </Routes>
        </>
     )
 }

// const navigation = [
//   { name: 'Home' , path : '/' },
//   { name: 'Todays Plate', path : '/today'  },
//   { name: 'Weekly Menu', path : '/menu'  },
//   { name: 'Feedback',  path : '/feedback' },
//   { name: 'Report Leave',  path : '/report' },
//   { name: 'About Mess',  path : '/about' },
// ]



function App() {
  return (
     <>
    <AuthProvider>
     <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
         <AppRouter/>
           <Toaster />
      </ThemeProvider>
     </BrowserRouter>
    </AuthProvider>
     </>
  )
}

export default App