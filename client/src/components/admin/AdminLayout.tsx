
import React, { useEffect, useState } from "react";
import {   NavLink, useLocation } from "react-router-dom";
import {  Users, Bell, PieChart, Menu, X, Home , SquareLibrary , MenuIcon , AppWindowIcon , ChartSpline  , Wallet , CookingPotIcon} from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   SidebarProvider,
//   Sidebar,
//   SidebarContent,
//   SidebarHeader,
//   SidebarMenu, 
//   SidebarMenuItem,
//   SidebarMenuButton,
//   SidebarTrigger,
//   SidebarInset,
//   SidebarFooter,
// } from "@/components/ui/sidebar";

// import {toast} from "sonner"

// import { AppSidebar } from "./AppSidebar";

// interface MenuItem {
//   to: string;
//   icon: JSX.Element;
//   label: string;
// }


interface AdminLayoutProps {
  children: React.ReactNode;
  currentPage: "dashboard" | "students" | "feedbacks" | "announcements" | "financials" | "ManageApplications" | "MenuUpdate" | "Attendance" | "RecipeGenerator";
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  // const navigate = useNavigate();
// const activityFunction = useActivityFunction();


  // const { isAuthenticated, role, logout } = useAuth();

  // useEffect(() => {
  //   if (!isAuthenticated || role !== "admin") {
  //     toast("Access Denied",{
  //       description: "You need to be an admin to access this page",
  //     });
  //     navigate("/login");
  //   }
  // }, [isAuthenticated, role, navigate]);

  // const handleLogout = () => {
  //   logout();
  //   activityFunction("admin Logged out");
  //   toast("Logged out",
  //     {
  //         description: "You have been logged out successfully",
  //     });
  //   navigate("/");
  // };




    const [open, setOpen] = useState<boolean>(false);
  const { pathname } = useLocation();

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on Escape
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  // Lock scroll when sidebar is open (mobile)
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

   const menuItems = [
    { to: "/admin", icon: <PieChart className="h-4 w-4" />, label: "Dashboard" },
    { to: "/admin-Attendence", icon: <SquareLibrary className="h-4 w-4" />, label: "Attendance" },
    { to: "/admin-students", icon: <Users className="h-4 w-4" />, label: "Fees Management" },
    { to: "/admin-manageApplications", icon: <AppWindowIcon className="h-4 w-4" />, label: "Manage Applications" },
    { to: "/admin-menuUpdate", icon: <MenuIcon className="h-4 w-4" />, label: "Manu Update" },
    { to: "/admin-announcements", icon: <Bell className="h-4 w-4" />, label: "Announcements" },
    { to: "/admin-feedback", icon: <ChartSpline className="h-4 w-4" />, label: "feedback Analysis" },
    {to : "/admin-RecipeGenerator" , icon :<CookingPotIcon className="h-4 w-4" />  , label : "Recipe Generator"},
    { to: "/admin-financials", icon: <Wallet className="h-4 w-4" />, label: "Financials" },
    { to: "/", icon: <Home className="h-4 w-4" />, label: "home" },
  ];



  return (
   <>
      {/* Mobile toggle button */}
      <button
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="app-sidebar"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 sm:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}


      {/* Sidebar */}
      <aside
        id="app-sidebar"
        className={`fixed top-0 left-0 z-50 w-64 h-screen flex flex-col justify-between
        transform transition-transform duration-300 -translate-x-full sm:translate-x-0
        ${open ? "translate-x-0" : ""}
        bg-gray-50 dark:bg-gray-800`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          {/* Mobile close button */}
          <div className="flex items-center justify-between sm:hidden mb-3">
            <span className="font-semibold text-gray-900 dark:text-white">Menu</span>
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="sr-only">Close sidebar</span>
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Menu */}
          <ul className="space-y-2 font-medium">
            {menuItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-2 rounded-lg group transition-colors ${
                      isActive
                        ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                        : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`
                  }
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Logout button */}
        {/* <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            // onClick={handleLogout}
            className="w-full flex items-center gap-3 p-2 rounded-lg transition-colors text-red-600 hover:bg-red-100 dark:hover:bg-red-900"
          >
            <LogOut className="h-4 w-4" />
            <span>Log out</span>
          </button>
        </div> */}


      </aside>

      {/* Content area (with margin on desktop) */}
      <div className="p-4 sm:ml-64">{children}</div>
    </>
  );
};

export default AdminLayout;
