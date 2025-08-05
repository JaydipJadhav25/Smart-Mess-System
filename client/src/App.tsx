import { ThemeProvider } from "./hooks/theme-provider"
import Index from "./pages/Index"
import {Route ,  BrowserRouter, Routes}  from "react-router-dom"
import NotFound from "./pages/NotFound"
import Today from "./pages/Today"
import Menu from "./pages/Menu"
import Feedback from "./pages/Feedback"
import Report from "./pages/Report"
import About from "./pages/About"


 const AppRouter = ()=>{
     return(
        <>
        <Routes>
          <Route path="/" element={<Index/>}/>
          <Route  path="/today" element={<Today/>}/>
          <Route  path="/menu" element={<Menu/>}/>
          <Route  path="/feedback" element={<Feedback/>}/>
          <Route  path="/report" element={<Report/>}/>
          <Route  path="/about" element={<About/>}/>
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
     <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
         <AppRouter/>
       </ThemeProvider>
     </BrowserRouter>
     </>
  )
}

export default App