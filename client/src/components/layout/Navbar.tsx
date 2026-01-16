import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon , ArrowRightIcon } from '@heroicons/react/24/outline'
import { ModeToggle } from '../mode-toggle'
import {Link, NavLink, useNavigate} from "react-router-dom"
import useAuth from '../context/useAuth'
import { axiosInstance } from '@/config/axiosInstances'
import { toast } from 'sonner'
// import Loading from '../flashPages/Loading'



// import { useEffect, useState } from 'react'




// const navigation = [
//   { name: 'Dashboard', href: '#', current: true },
//   { name: 'Team', href: '#', current: false },
//   { name: 'Projects', href: '#', current: false },
//   { name: 'Calendar', href: '#', current: false },
// ]
 

const navigation = [
  { name: 'Home' , path : '/' },
  { name: 'Todays Plate', path : '/today'  },
  { name: 'Weekly Menu', path : '/menu'  },
  // { name: 'Feedback',  path : '/feedback' },
  { name: 'About Mess',  path : '/about' },
  // { name: 'Feedback',  path : '/feedback' },
  // { name: 'Report Leave',  path : '/report' },
]

function classNames(...classes :  any) {
  return classes.filter(Boolean).join(' ')
}



// const context = useAuth(); // bhai error yenar na function chya outside call krtoy hook
// const[studentId , setStudentId] = useState<number | null>(null);
// useEffect(()=>{

//  setStudentId(localStorage.getItem("student_id"));

// },[]);

// const studentId = localStorage.getItem("student_id") || null;










export default function Navbar() {






  //use state
// const [studentId, setStudentId] = useState<number | null>(null);

//   useEffect(() => {
//     const idStr = localStorage.getItem("student_id");
//     const idNum = idStr ? Number(idStr) : null; // convert string to number
//     setStudentId(idNum);
//   }, []);



const {isAuthenticated , student_id  , logout , role} = useAuth();
  //navigater
const navigate = useNavigate();

//user logout
const userLogout = async ()=>{
try {
  
  const response = await axiosInstance.get("/user/logout");

  console.log(response.data);
  
  toast.success("User Logout Successfully !");

  //clear from locastorage
  logout();
  //remove token
  //  localStorage.removeItem("token");
  navigate("/");


} catch (error:any ) {
       const userError = error?.response?.data.message;
   console.log("error : " , userError)
    toast.success(userError || "User Logout Successfully !");
  navigate("/");

}finally{
  navigate("/");
}

}






  return (
    <Disclosure
  as="nav"
  className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg"
>
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="relative flex h-16 items-center justify-between">

      {/* Mobile Menu Button */}
      <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary">
          <Bars3Icon className="block h-6 w-6 data-open:hidden" />
          <XMarkIcon className="hidden h-6 w-6 data-open:block" />
        </DisclosureButton>
      </div>

      {/* Brand */}
      <div className="flex flex-1 items-center justify-center sm:justify-start">
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Smart Mess System"
            className="h-8 w-auto rounded-md"
          />

          <span className="hidden md:inline-flex items-center text-lg font-extrabold tracking-wide">
            <span className="text-foreground">SMART</span>
            <span className="mx-1 text-primary">MESS</span>
            <span className="text-foreground">SYSTEM</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden sm:ml-8 sm:block">
          <div className="flex items-center gap-2">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  classNames(
                    "rounded-md px-3 py-2 text-sm font-medium transition",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">

        {!isAuthenticated ? (
          <Link
            to="/login"
            className="flex items-center gap-2 rounded-md bg-muted px-3 py-1.5 text-sm font-medium hover:bg-muted/80"
          >
            Profile
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        ) : (
          <Menu as="div" className="relative">
            <MenuButton className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary">

              {/* Avatar */}
              <div
                className={`relative rounded-full p-0.5 ${
                  role === "admin"
                    ? "bg-gradient-to-tr from-amber-400 via-yellow-500 to-amber-600"
                    : ""
                }`}
              >
                <img
                  src={
                    role === "admin"
                      ? "/admin2.png"
                      : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt="User"
                  className="h-8 w-8 rounded-full"
                />

                {role === "admin" && (
                  <span className="absolute -bottom-1 -right-1 rounded-full bg-amber-500 px-1.5 py-0.5 text-[9px] font-bold text-black">
                    ADMIN
                  </span>
                )}
              </div>

              <span className="hidden sm:inline-block rounded-md bg-muted px-2 py-1 text-xs font-medium">
                {student_id}
              </span>
            </MenuButton>

            <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-background py-1 shadow-lg ring-1 ring-black/5">
              {role === "admin" && (
                <MenuItem>
                  <Link
                    to="/admin"
                    className="block px-4 py-2 text-sm hover:bg-muted"
                  >
                    Dashboard
                  </Link>
                </MenuItem>
              )}

              <MenuItem>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm hover:bg-muted"
                >
                  Your Profile
                </Link>
              </MenuItem>

              <MenuItem>
                <Link
                  to={role === "admin" ? "/admin-settings" : "#"}
                  className="block px-4 py-2 text-sm hover:bg-muted"
                >
                  Settings
                </Link>
              </MenuItem>

              <MenuItem>
                <button
                  onClick={userLogout}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-muted"
                >
                  Sign Out
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
        )}

        {/* Theme Toggle */}
        <ModeToggle />
      </div>
    </div>
  </div>

  {/* Mobile Menu */}
  <DisclosurePanel className="sm:hidden">
    <div className="space-y-1 px-3 pt-2 pb-3">
      {navigation.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            classNames(
              "block rounded-md px-3 py-2 text-base font-medium",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            )
          }
        >
          {item.name}
        </NavLink>
      ))}
    </div>
  </DisclosurePanel>


  {/* <Loading/> */}
  <div className="absolute top-0 left-0 h-0.5 w-full bg-white/5 overflow-hidden z-50"> <div className="h-full w-full bg-gradient-to-r from-blue-700 via-sky-400 to-orange-300 animate-topBar rounded-r-full"></div> </div>
</Disclosure>

  )
}
