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
import LeavePopup from "./pages/student/LeavePopup"
import Records from "./pages/student/Records"
import {QueryClientProvider , QueryClient} from "@tanstack/react-query"
import AdminManegApplications from "./pages/admin/AdminManegApplications"
import AdminUpdateMenu from "./pages/admin/AdminUpdateMenu"
import AdminAttendence from "./pages/admin/AdminAttendence"
import AdminRecipeGenerator from "./pages/admin/AdminRecipeGenerator"
import ApplicationReview from "./components/admin/ApplicationReview"
import Recipt from "./pages/Recipt"
import Unauthorized from "./pages/Unauthorized"
import ProtectedRoute from "./utils/ProtectedRoute"
import AdminLogin from "./pages/admin/AdminLogin"
import AdminSettingPage from "./pages/admin/AdminSettingPage"
import { AdminSettingProvider } from "./components/context/AdminSetting"
import TranscationSuccess from "./components/Transcations/TranscationSuccess"





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

           
          <Route path="/receipt/:id" element={<Recipt/>}/>

          {/* <Route path="/feedbackform" element={<FeedbackForm/>}/> */}


          {/* Stunndents routes */}
         
          <Route path="/profile" element={
            <ProtectedRoute allowedRoles={["student" , "admin"]}>
               <StudentPanel/>
            </ProtectedRoute>
            }/>   
          <Route path="/profile-feedback" element={
            <ProtectedRoute allowedRoles={["student" , "admin"]}>
               <Feedback/>
            </ProtectedRoute>
            }/>   
          <Route path="/profile-records" element={
            <ProtectedRoute allowedRoles={["student" , "admin"]}>
            <Records/>
            </ProtectedRoute>
            }/>
          <Route path="/profile-plane" element={
            <ProtectedRoute allowedRoles={["student" , "admin"]}>        
            <StudentPlane/>
            </ProtectedRoute>
            }/>   
          <Route path="/profile-form" element={
            <ProtectedRoute allowedRoles={["student" , "admin"]}>
            <StudentForm/>
            </ProtectedRoute>
            }/>
          <Route path="/profile-leave" element={
            <ProtectedRoute allowedRoles={["student" , "admin"]}>
            <LeavePopup/>
            </ProtectedRoute>
            }/> 

            <Route path="/transcation-success" element={
            <ProtectedRoute allowedRoles={["student" , "admin"]}>
             <TranscationSuccess/>
            </ProtectedRoute>
            }/>     




             {/* adminlogin */}
            <Route  path="/admin-login" element={<AdminLogin/>}/>


             {/* admin routes */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminPanel/>
            </ProtectedRoute>
            }/>   
          <Route path="/admin-students" element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminStudents/>
            </ProtectedRoute>
            }/>   
          <Route path="/admin-feedback" element={
            <ProtectedRoute allowedRoles={["admin"]}>
            <AdminFeedbacks/>
            </ProtectedRoute>
            }/>   
          <Route path="/admin-announcements" element={
            <ProtectedRoute allowedRoles={["admin"]}>
            <AdminAnnouncements/>
            </ProtectedRoute>
            }/>   
          <Route path="/admin-financials" element={
            <ProtectedRoute allowedRoles={["admin"]}>
            <AdminFinancials/>
            </ProtectedRoute>
            }/>   
          <Route path="/admin-manageApplications" element={
            <ProtectedRoute allowedRoles={["admin"]}>
            <AdminManegApplications/>
            </ProtectedRoute>
            }/>   
          <Route path="/admin-menuUpdate" element={
            <ProtectedRoute allowedRoles={["admin"]}>
            <AdminUpdateMenu/>
            </ProtectedRoute>
            }/>   
          <Route path="/admin-Attendence" element={
            <ProtectedRoute allowedRoles={["admin"]}>
            <AdminAttendence/>
            </ProtectedRoute>
            }/>   
          <Route  path="/admin-RecipeGenerator" element={
            <ProtectedRoute allowedRoles={["admin"]}>
            <AdminRecipeGenerator/>
            </ProtectedRoute>
            }/>
          <Route path="/admin-applicationReview/:id"  element={
            <ProtectedRoute allowedRoles={["admin"]}>
            <ApplicationReview/>
            </ProtectedRoute>
            }/>




            {/* admin setting page */}
            <Route path="/admin-settings"  element={
            <ProtectedRoute allowedRoles={["admin"]}>
             <AdminSettingPage/>
            </ProtectedRoute>
            }/>

          {/* <Route path="/ai" element={<FeedbackAnalysis/>}/> */}
          {/* <Route path="/dashbord" element={<AnalyticsDashboard/>}/> */}




          <Route   path="/unauthorized" element={<Unauthorized />} />
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


//create client of react - query
const client = new QueryClient();


function App() {
  return (
     <>
     <QueryClientProvider client={client}>
      <AdminSettingProvider>
      <AuthProvider>
     <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
         <AppRouter/>
           <Toaster />
      </ThemeProvider>
     </BrowserRouter>
    </AuthProvider>
    </AdminSettingProvider>
     </QueryClientProvider>
     </>
  )
}

export default App