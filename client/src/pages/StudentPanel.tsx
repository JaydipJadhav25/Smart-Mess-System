
// import { Link } from "react-router-dom";
// import { Users, Calendar, Bell, PieChart } from "lucide-react";
import useAuth from "@/components/context/useAuth";
import StudentLayout from "@/components/students/StudentLayout";



// interface Activity {
//   action: string;
//   createdAt: string; // or Date if parsed
//   _id: string; // assuming _id is present from MongoDB
// }






export const StudentPanel = () => {



  //aacess student data 
  const{student_id , username , isAuthenticated , isFormSubmitted} = useAuth();


  return (
    <StudentLayout currentPage="profile">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">



        <div className="bg-card p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-medium mb-1">Student_Id</h3>
          <p className="text-3xl font-bold">{student_id}</p>
          {/* <p className="text-sm text-muted-foreground mt-2">+3 this month</p> */}
        </div>

        <div className="bg-card p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-medium mb-1">Email</h3>
          <p className="text-xl font-bold truncate">{username}</p>
          {/* <p className="text-sm text-muted-foreground mt-2">+3 this month</p> */}
        </div>

        <div className={`bg-card p-6 rounded-lg border shadow-sm flex justify-center items-center ${isAuthenticated ?'bg-green-400' : 'bg-red-800'}`}>
          {/* <h3 className="text-lg font-medium mb-1">Verifed</h3> */}
          <p className={`text-3xl font-bold`}>{
            isAuthenticated ? "verifed" : "UnVerifed"
            }</p>
          {/* <p className="text-sm text-muted-foreground mt-2">+3 this month</p> */}
        </div>

         <div className={`bg-card p-6 rounded-lg border shadow-sm flex justify-center items-center ${isFormSubmitted ?'bg-green-400' : 'bg-red-800'}`}>
          {/* <h3 className="text-lg font-medium mb-1">Verifed</h3> */}
          <p className={`text-3xl font-bold`}>{
            isFormSubmitted ? "Form filled" : "Form unFiiled"
            }</p>
          {/* <p className="text-sm text-muted-foreground mt-2">+3 this month</p> */}
        </div>
        
        {/* <div className="bg-card p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-medium mb-1">Upcoming Events</h3>
          <p className="text-3xl font-bold">7</p>
          <p className="text-sm text-muted-foreground mt-2">Next: Hackathon 2023</p>
        </div> */}
        
        {/* <div className="bg-card p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-medium mb-1">Recent Announcements</h3>
          <p className="text-3xl font-bold">12</p>
          <p className="text-sm text-muted-foreground mt-2">3 unread</p>
        </div> */}
        
        {/* <div className="bg-card p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-medium mb-1">Budget Status</h3>
          <p className="text-3xl font-bold">₹42,500</p>
          <p className="text-sm text-muted-foreground mt-2">25% allocated</p>
        </div> */}

      </div>


        
    </StudentLayout>
  );
};


