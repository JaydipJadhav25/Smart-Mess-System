
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Users, Calendar, Bell, PieChart } from "lucide-react";



// interface Activity {
//   action: string;
//   createdAt: string; // or Date if parsed
//   _id: string; // assuming _id is present from MongoDB
// }




export const AdminPanel = () => {



  return (
    <>
    <AdminLayout currentPage="dashboard">
  {/* Admin Profile Section */}
  <div className="mb-8 flex items-center gap-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 p-6 rounded-2xl border shadow">
    <div className="h-16 w-16 rounded-full bg-purple-600 text-white flex items-center justify-center text-2xl font-bold shadow">
      A
    </div>
    <div>
      <h2 className="text-3xl font-bold">Admin</h2>
      <p className="text-muted-foreground text-sm">Smart Mess System Administrator</p>
    </div>
  </div>

  {/* Stat Cards */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {[
      {
        title: "Total Students",
        value: 120,
        subtitle: "Active in mess system",
        gradient: "from-blue-500/20 to-blue-700/20",
      },
      {
        title: "Today Attendance",
        value: "92%",
        subtitle: "Mess attendance rate",
        gradient: "from-green-500/20 to-green-700/20",
      },
      {
        title: "Feedback Received",
        value: 48,
        subtitle: "5 new feedbacks",
        gradient: "from-yellow-500/20 to-orange-500/20",
      },
      {
        title: "Monthly Budget",
        value: "₹42,500",
        subtitle: "25% used this month",
        gradient: "from-pink-500/20 to-red-500/20",
      },
    ].map((item, index) => (
      <div
        key={index}
        className={`p-6 rounded-2xl border shadow bg-gradient-to-br ${item.gradient} hover:shadow-xl transition-all duration-200`}
      >
        <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
        <p className="text-4xl font-bold">{item.value}</p>
        <p className="text-sm text-muted-foreground mt-2">{item.subtitle}</p>
      </div>
    ))}
  </div>

  {/* Sections */}
  <div className="mt-12 space-y-8">

    {/* Quick Access */}
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl border shadow">
      <h2 className="text-xl font-semibold mb-6">Quick Access</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: "Applications", icon: Users, link: "/admin-manageApplications" },
          { label: "Feedbacks", icon: Calendar, link: "/admin-feedback" },
          { label: "Post Announcement", icon: Bell, link: "/admin-announcements" },
          { label: "Budget Overview", icon: PieChart, link: "/admin-financials" },
        ].map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className="p-5 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl flex flex-col items-center justify-center text-center transition-all border shadow-sm"
          >
            <item.icon className="h-7 w-7 mb-2 text-indigo-600" />
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>

    {/* Today's Meal */}
    <div className="bg-gradient-to-br from-orange-100/60 to-yellow-100/60 dark:from-orange-900/20 dark:to-yellow-900/10 p-6 rounded-2xl border shadow">
      <h2 className="text-xl font-semibold mb-4">Today’s Mess Menu</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border shadow">
          <h4 className="font-semibold">Breakfast</h4>
          <p className="text-muted-foreground">Poha, Tea, Banana</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border shadow">
          <h4 className="font-semibold">Lunch</h4>
          <p className="text-muted-foreground">Dal, Rice, Roti, Paneer</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border shadow">
          <h4 className="font-semibold">Dinner</h4>
          <p className="text-muted-foreground">Veg Biryani, Curd</p>
        </div>
      </div>
    </div>

    {/* Feedback Summary */}
    <div className="bg-gradient-to-br from-red-100/50 to-pink-100/50 dark:from-red-900/20 dark:to-pink-900/20 p-6 rounded-2xl border shadow">
      <h2 className="text-xl font-semibold mb-4">Feedback & Issues</h2>

      <div className="space-y-4">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border shadow">
          <h4 className="font-semibold">Food Quality Complaints</h4>
          <p className="text-muted-foreground text-sm">12 complaints this month</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border shadow">
          <h4 className="font-semibold">Positive Feedback</h4>
          <p className="text-muted-foreground text-sm">78% satisfaction rating</p>
        </div>
      </div>
    </div>

    {/* Recent Activity */}
    <div className="bg-card p-6 rounded-2xl border shadow">
      <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
      <div className="space-y-4">
        <p className="text-muted-foreground text-sm">• 4 New Leave Requests</p>
        <p className="text-muted-foreground text-sm">• 3 Feedbacks marked unresolved</p>
        <p className="text-muted-foreground text-sm">• Announcement posted: "Sunday Special Dinner"</p>
      </div>
    </div>

  </div>
</AdminLayout>

    
    </>
  );
};


