import StudentLayout from "@/components/students/StudentLayout";
import { axiosInstance } from "@/config/axiosInstances";
import { useState, useEffect } from "react";
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

  return (
    <StudentLayout currentPage="leave">
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
          hidden={!leaveType}
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
