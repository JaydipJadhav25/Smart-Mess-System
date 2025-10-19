
// import { Link } from "react-router-dom";
// import { Users, Calendar, Bell, PieChart } from "lucide-react";
import StudentLayout from "@/components/students/StudentLayout";



// interface Activity {
//   action: string;
//   createdAt: string; // or Date if parsed
//   _id: string; // assuming _id is present from MongoDB
// }




export const StudentPanel = () => {



  return (
    <StudentLayout currentPage="profile">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-medium mb-1">Total Members</h3>
          <p className="text-3xl font-bold">42</p>
          <p className="text-sm text-muted-foreground mt-2">+3 this month</p>
        </div>
        
        <div className="bg-card p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-medium mb-1">Upcoming Events</h3>
          <p className="text-3xl font-bold">7</p>
          <p className="text-sm text-muted-foreground mt-2">Next: Hackathon 2023</p>
        </div>
        
        <div className="bg-card p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-medium mb-1">Recent Announcements</h3>
          <p className="text-3xl font-bold">12</p>
          <p className="text-sm text-muted-foreground mt-2">3 unread</p>
        </div>
        
        <div className="bg-card p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-medium mb-1">Budget Status</h3>
          <p className="text-3xl font-bold">₹42,500</p>
          <p className="text-sm text-muted-foreground mt-2">25% allocated</p>
        </div>
      </div>


        
    </StudentLayout>
  );
};


