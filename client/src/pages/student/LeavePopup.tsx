import StudentLayout from "@/components/students/StudentLayout";
import { axiosInstance } from "@/config/axiosInstances";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// interface LeavePopupProps {
//   onSubmit: (reason: string) => void;
// }

const LeavePopup = () => {
  //   const [showPopup, setShowPopup] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [leaveHistory, setStudentLeaveHistory] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  // const {isFormSubmitted} = useAuth();

  const reasons = [
    "Going home for personal work",
    "Medical reason",
    "Family function",
    "Urgent personal matter",
    "Other",
  ];

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();

    const isMorningLeave = hours >= 7 && hours <= 10;
    const isNightLeave = hours >= 17 && hours <= 19;
   
    if (isMorningLeave || isNightLeave) {
      //   setShowPopup(true);
    }
  }, []);

  //   if (!showPopup) return null;

  const now = new Date();
  // const day = now.toLocaleDateString("en-US", { weekday: "long" });
  // const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const hours = now.getHours();
  console.log("houser : ", hours);
  
  const leaveType =
    hours >= 7 && hours <= 10 ? "morning" : hours <= 19 ? "night" : null;

  async function onSubmit(finalReason: string) {
    // if (!isFormSubmitted) return;
    try {
      const response = await axiosInstance.post("/user/leave/add", {
        reason: finalReason,
        mode: leaveType,
      });
      // setShowPopup(false);
      console.log("responce : ", response.data);
      //check response
      toast.success(`${leaveType} mess leave applied successfully`);
    } catch (error) {
      console.log("error :", error);
      toast.warning(`You already took ${leaveType} mess leave for today! `);
    }
  }

  //get all studentts leavs
  useEffect(() => {
    async function fetchData(){
      const response = await axiosInstance("/user/leave/history");
      // console.log("result : " , leavesHistory.data);
       setStudentLeaveHistory(response.data.data);
     setTotalCount(response.data.count);

    }
    fetchData();
  }, []);

 
  //check istoday
  const isToday = (date: string) => {
  const today = new Date();
  const leaveDate = new Date(date);

  return (
    today.getDate() === leaveDate.getDate() &&
    today.getMonth() === leaveDate.getMonth() &&
    today.getFullYear() === leaveDate.getFullYear()
  );
};




  const handleSubmit = async () => {
    const finalReason =
      selectedReason === "Other" ? customReason.trim() : selectedReason;

    if (!finalReason) {
      alert("Please select or enter a reason!");
      return;
    }
    console.log("rsone : ", finalReason);
    onSubmit(finalReason);
  };

  const navigate = useNavigate();


  return (
    <StudentLayout currentPage="leave">
       
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

      <div className="font-sans max-w-4xl my-10 mx-auto p-6 shadow-lg rounded-lg bg-white">
        {/* <div className="bg-white dark:bg-[#1e1e1e] text-gray-800 dark:text-gray-100 rounded-2xl p-6 w-96 shadow-lg relative"> */}
        <h2 className="dark:text-black text-xl font-semibold text-center mb-2 capitalize">
          {leaveType} Leave
        </h2>
        <h2 className="dark:text-black text-xl font-semibold text-center mb-2">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h2>
        <p className="text-sm text-center text-gray-500 mb-4">
          Select your reason for today’s leave:
        </p>

        {/* Reason dropdown */}
        <select
          value={selectedReason}
          onChange={(e) => setSelectedReason(e.target.value)}
          className="bg-background w-full border dark:text-white border-gray-300 dark:border-gray-600 rounded-lg p-2 mb-4 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Select a reason --</option>
          {reasons.map((reason) => (
            <option key={reason} value={reason}>
              {reason}
            </option>
          ))}
        </select>

        {/* Custom reason input */}
        {selectedReason === "Other" && (
          <textarea
            value={customReason}
            onChange={(e) => setCustomReason(e.target.value)}
            placeholder="Enter your reason..."
            className="w-full border border-gray-300 dark:text-black dark:border-gray-600 rounded-lg p-2 text-sm bg-transparent mb-4 focus:ring-2 focus:ring-blue-500"
          />
        )}

        <button
          disabled={!leaveType}
          onClick={handleSubmit}
          hidden={!leaveType  || localStorage.getItem("applicationSubmit") !== "true"}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition cursor-pointer"
        >
          Submit Leave
        </button>
      </div>

      {/* Leave History */}
<div className="mt-10">
  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
    Leave History
  </h3>

  <p className="text-sm text-gray-500 mb-4">
    Total Leaves Taken: <span className="font-semibold">{totalCount}</span>
  </p>

  {leaveHistory.length === 0 ? (
    <p className="text-sm text-gray-400 text-center">
      No leave history found
    </p>
  ) : (
    <div className="space-y-3">
      {leaveHistory.map((leave) => {
        const todayLeave = isToday(leave.leaveDate);

        return (
          <div
            key={leave._id}
            className={`p-4 rounded-lg border flex justify-between items-center
              ${todayLeave
                ? "bg-blue-50 border-blue-500"
                : "bg-gray-50 border-gray-200"
              }`}
          >
            <div>
              <p className="font-medium text-gray-800 capitalize">
                {leave.mealType} Meal
              </p>
              <p className="text-sm text-gray-500">
                {new Date(leave.leaveDate).toDateString()}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Reason: {leave.reason}
              </p>
            </div>

            {todayLeave && (
              <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                TODAY
              </span>
            )}
          </div>
        );
      })}
    </div>
  )}
</div>

    </StudentLayout>
  );
};

export default LeavePopup;
