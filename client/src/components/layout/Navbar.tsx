import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon , ArrowRightIcon } from '@heroicons/react/24/outline'
import { ModeToggle } from '../mode-toggle'
import {Link, NavLink, useNavigate} from "react-router-dom"
import useAuth from '../context/useAuth'
import { axiosInstance } from '@/config/axiosInstances'
import { toast } from 'sonner'



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
  { name: 'Feedback',  path : '/feedback' },
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



const {isAuthenticated , student_id  , logout} = useAuth();
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
    <Disclosure as="nav" className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg">

  <div className="px-4 sm:px-6 lg:px-8 w-full">

       <div className="flex justify-between items-center h-16 w-full">

      
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
               {/* <div className="flex items-center justify-between sm:hidden w-full"> */}
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>

            
          </div> 

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            {/* <div className="flex shrink-0 items-center">
              <img
                alt="Your Company"
                src="logo.png"
                className="h-12 w-auto object-contain rounded-md"
              />
              <span className="hidden md:inline-block text-sm font-medium">
              Smart Mess System
          </span>
            </div> */}

             <div className="flex items-center space-x-2">
          <img
            src="logo.png"
            alt="Logo"
            className="w-auto h-8 object-contain rounded-md"
          />
          <span className="hidden md:inline-block text-sm font-medium">
        Smat Mess System
          </span>
        </div>

            <div className="hidden sm:ml-6 sm:block">
              <div className="flex items-center space-x-4">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      classNames(
                        isActive
                          ? 'bg-gray-900 text-white'
                          : 'text-black dark:text-white hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium'
                      )
                    }
                  >
                    {item.name}
                  </NavLink>

                ))}
              </div>
            </div>



          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button>

            {/* Profile dropdown */}
            {
              !isAuthenticated ? <>
                <Link to={"/login"} className='ml-3 flex items-center gap-2 text-sm font-medium bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md'><span>Profile</span>
                <ArrowRightIcon  aria-hidden="true" className="size-5" />
                </Link>              
              </>: <>
              <Menu as="div" className="relative ml-3">

              <MenuButton className="relative flex rounded-full dark:bg-gray-800 text-sm focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800">
              <span className="absolute -inset-1.5" />
          
                   <img
                  alt=""
                  //src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                 src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  className="size-8 rounded-full"
                />          
              <span className="text-sm font-medium bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                {
                   student_id
                }
              </span>
              

              </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-background backdrop-blur-lg py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-white dark:data-focus:bg-gray-900 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Your Profile
                  </a>
                </MenuItem> 
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-white dark:data-focus:bg-gray-900 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Settings
                  </a>
                </MenuItem>
                <MenuItem>
                    <button
                    onClick={userLogout}
                    className='block px-4 py-2 text-sm text-gray-700 dark:text-white dark:data-focus:bg-gray-900 data-focus:bg-gray-100 data-focus:outline-hidden cursor-pointer' >
                       Sign Out
                    </button>
                </MenuItem>
              </MenuItems>

            </Menu>
              </>
            }
            
             {/* mode  */}
                <div className='px-3'>
                    <ModeToggle/>
                </div>
                {/* student id  */}
            {/* <div className="ml-auto flex items-center space-x-3">
            <span className="text-sm text-muted-foreground">ID:</span>
            <span className="text-sm font-medium bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
              S2025001
            </span>
            </div> */}

          </div>
        </div>

      </div>



      {/* <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            // <DisclosureButton
            //   key={item.name}
            //   as="a"
            //   href={item.href}
            //   aria-current={item.current ? 'page' : undefined}
            //   className={classNames(
            //     item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            //     'block rounded-md px-3 py-2 text-base font-medium',
            //   )}
            // >
            //   {item.name}
            // </DisclosureButton>
                        <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                classNames(
                  isActive
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium'
                )
              }
            >
              {item.name}
            </NavLink>

          ))}
        </div>
      </DisclosurePanel> */}


      <DisclosurePanel className="sm:hidden">
  <div className="space-y-1 px-3 pt-2 pb-3">
    {navigation.map((item) => (
      <NavLink
        key={item.name}
        to={item.path}
        className={({ isActive }) =>
          classNames(
            isActive
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'block rounded-md px-3 py-2 text-base font-medium'
          )
        }
      >
        {item.name}
      </NavLink>
    ))}
  </div>
</DisclosurePanel>





      <div className="absolute top-0 left-0 h-0.5 w-full bg-white/5 overflow-hidden z-50">
  <div className="h-full w-full bg-gradient-to-r from-blue-700 via-sky-400 to-orange-300 animate-topBar rounded-r-full"></div>
</div>
    </Disclosure>
  )
}
