import StudentLayout from "@/components/students/StudentLayout";
import  { useState, useEffect } from "react";

// interface LeavePopupProps {
//   onSubmit: (reason: string) => void;
// }

const LeavePopup  = () => {

//   const [showPopup, setShowPopup] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");

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
  console.log("houser : " , hours)
  const leaveType =
    hours >= 7 && hours <= 10
      ? "🌅 Morning Leave"
      :  hours <= 19
      ? "🌙 Night Leave"
      : null;

      
  const handleSubmit = () => {
    const finalReason =
      selectedReason === "Other" ? customReason.trim() : selectedReason;

    if (!finalReason) {
      alert("Please select or enter a reason!");
      return;
    }

    // onSubmit(finalReason);

    console.log("rsone : " , finalReason);
    // setShowPopup(false);
  };

  console.log("lveav type:" , !leaveType)

  return (
         <StudentLayout currentPage="leave">

            <div className="font-sans max-w-4xl my-10 mx-auto p-6 shadow-lg rounded-lg bg-white">
      {/* <div className="bg-white dark:bg-[#1e1e1e] text-gray-800 dark:text-gray-100 rounded-2xl p-6 w-96 shadow-lg relative"> */}
        <h2 className="dark:text-black text-xl font-semibold text-center mb-2">
          {leaveType}
        </h2>
        <h2 className="dark:text-black text-xl font-semibold text-center mb-2">
         {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h2>
         {/* Date */}
        {/* <p className="text-sm text-black md:text-base font-medium tracking-wide">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p> */}
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

        {/* <button
          onClick={() => console.log("done")}
          className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-xl"
        >
          ×
        </button> */}
      </div>

         </StudentLayout>
  );
};

export default LeavePopup;
