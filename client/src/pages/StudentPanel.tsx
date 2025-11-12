import useAuth from "@/components/context/useAuth";
import StudentLayout from "@/components/students/StudentLayout";
import { axiosInstance } from "@/config/axiosInstances";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export const StudentPanel = () => {
  const { student_id, username } = useAuth();

  // Fetch profile data
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await axiosInstance.get("/user/myProfile");
      return response.data?.user || response.data;
    },
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  if (isLoading) {
    return (
      <StudentLayout currentPage="profile">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
          <span className="ml-2 text-gray-500">Loading profile...</span>
        </div>
      </StudentLayout>
    );
  }

  if (isError) {
    return (
      <StudentLayout currentPage="profile">
        <div className="text-center text-red-500 mt-10">
          <h2 className="text-xl font-semibold">Failed to load profile</h2>
          <p className="text-gray-600">{error?.message}</p>
        </div>
      </StudentLayout>
    );
  }

  const student = data || {};
  const firstInitial = student.firstName?.[0]?.toUpperCase() || username?.[0]?.toUpperCase() || "?";
  const lastInitial = student.lastName?.[0]?.toUpperCase() || "";

  return (
    <StudentLayout currentPage="profile">
      <div className="space-y-10 animate-fadeIn">

        {/* Header Section */}
        <div className="bg-white dark:bg-gray-800 border rounded-2xl shadow-md p-6 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-5">
            {/* Profile Circle */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-sm">
              {firstInitial}
              {lastInitial}
            </div>

            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Welcome, {student.firstName || username} 
              </h1>
              <p className="text-gray-500 text-sm">
                Here’s your personalized profile overview
              </p>
            </div>
          </div>

          <div className="text-sm font-medium bg-blue-100 text-blue-700 px-4 py-1 rounded-full shadow-sm">
            ID: {student.student_id || student_id}
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Full Name */}
          <div className="bg-card p-6 rounded-xl border hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-sm text-gray-500 mb-2 uppercase tracking-wide">
              Full Name
            </h3>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">
              {student.firstName || "—"} {student.lastName || ""}
            </p>
          </div>

          {/* Email */}
          <div className="bg-card p-6 rounded-xl border hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-sm text-gray-500 mb-2 uppercase tracking-wide">
              Email
            </h3>
            <p className="text-lg font-medium text-gray-800 dark:text-white truncate">
              {student.email || username}
            </p>
          </div>

          {/* Verified Status */}
          <div
            className={`p-6 rounded-xl border flex flex-col items-center justify-center shadow-sm ${
              student.verified
                ? "bg-green-50 dark:bg-green-900/30"
                : "bg-red-50 dark:bg-red-900/30"
            }`}
          >
            <p
              className={`text-2xl font-semibold ${
                student.verified ? "text-green-600" : "text-red-600"
              }`}
            >
              {student.verified ? "Verified" : "Unverified"}
            </p>
            <p className="text-sm text-gray-500 mt-1">Account status</p>
          </div>

          {/* Form Submission Status */}
          <div
            className={`p-6 rounded-xl border flex flex-col items-center justify-center shadow-sm ${
              student.isFormSubmitted
                ? "bg-green-50 dark:bg-green-900/30"
                : "bg-red-50 dark:bg-red-900/30"
            }`}
          >
            <p
              className={`text-2xl font-semibold ${
                student.isFormSubmitted ? "text-green-600" : "text-red-600"
              }`}
            >
              {student.isFormSubmitted ? "Form Filled" : "Form Pending"}
            </p>
            <p className="text-sm text-gray-500 mt-1">Mess admission status</p>
          </div>
        </div>

        {/* Optional Extra Info */}
        {/* {(student.department || student.year || student.hostelName) && (
          <div className="bg-card p-6 rounded-xl border hover:shadow-lg transition-all duration-300">
            <h3 className="text-sm text-gray-500 mb-3 uppercase tracking-wide">
              Additional Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-800 dark:text-white">
              {student.department && (
                <p>
                  <span className="font-semibold">Department:</span>{" "}
                  {student.department}
                </p>
              )}
              {student.year && (
                <p>
                  <span className="font-semibold">Year:</span> {student.year}
                </p>
              )}
              {student.hostelName && (
                <p>
                  <span className="font-semibold">Hostel:</span>{" "}
                  {student.hostelName}
                </p>
              )}
            </div>
          </div>
        )} */}
      </div>
    </StudentLayout>
  );
};
