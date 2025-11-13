import useAuth from "@/components/context/useAuth";
import StudentLayout from "@/components/students/StudentLayout";
import { axiosInstance } from "@/config/axiosInstances";
import { useQuery } from "@tanstack/react-query";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Records() {
  const { student_id } = useAuth();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["myRecord"],
    queryFn: async () => {
      if (!student_id) return [];
      const res = await axiosInstance.get(`/open/fees/records/${student_id}`);
      return res.data || [];
    },
  });

  return (
    <StudentLayout currentPage="records">
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          My Fee Records
        </h1>

        {/* Loading */}
        {isLoading && (
          <p className="text-center text-gray-500">Loading records...</p>
        )}

        {/* Error */}
        {isError && (
          <p className="text-center text-red-500">
            Unable to load records. Try again later.
          </p>
        )}

        {/* No Records */}
        {!isLoading && data?.length === 0 && (
          <p className="text-center text-gray-500">No fee records found!</p>
        )}

        {/* Records */}
        <div className="space-y-4 mt-4">
          {data?.map((fee: any, index: number) => (
       <div
  key={index}
  className={`p-6 rounded-xl border shadow-sm transition hover:shadow-md
    ${fee.amount > 0 
      ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700" 
      : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700"
    }`}
>
  {/* Month & Year */}
  <div className="flex justify-between items-center mb-3">
    <span className="px-3 py-1 text-sm font-medium rounded-full
      bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
      shadow-sm">
      {fee.month} {fee.year}
    </span>

    <span className="text-xs text-gray-500 dark:text-gray-400">
      Receipt ID: {fee._id}
    </span>
  </div>

  {/* Amount */}
  <p className="text-3xl font-bold text-green-600 dark:text-green-400">
    ₹{fee.amount}
  </p>

  {/* Method */}
  <p className="mt-2 text-sm font-medium text-gray-800 dark:text-gray-200">
    Payment Method:{" "}
    <span className="font-semibold">
      {fee.method.toUpperCase()}
    </span>
  </p>

  {/* Date */}
  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
    Paid On: {new Date(fee.paymentDate).toLocaleString()}
  </p>
</div>

            
          ))}
        </div>

        




      </div>
    </StudentLayout>
  );
}

export default Records;


// <Card
//               key={index}
//               className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition"
//             >
//               <CardHeader>
//                 <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
//                   {fee.month} {fee.year}
//                 </CardTitle>
//               </CardHeader>

//               <CardContent className="space-y-2">
//                 <div className="flex justify-between items-center">
//                   <p className="text-gray-700 dark:text-gray-300 font-medium">
//                     Amount Paid
//                   </p>
//                   <p className="text-xl font-bold text-green-600">
//                     ₹{fee.amount}
//                   </p>
//                 </div>

//                 <div className="flex justify-between items-center">
//                   <p className="text-gray-700 dark:text-gray-300 font-medium">
//                     Payment Method
//                   </p>
//                   <p className="text-gray-800 dark:text-gray-100">
//                     {fee.method.toUpperCase()}
//                   </p>
//                 </div>

//                 <div className="flex justify-between items-center">
//                   <p className="text-gray-700 dark:text-gray-300 font-medium">
//                     Paid On
//                   </p>
//                   <p className="text-gray-600 dark:text-gray-300">
//                     {new Date(fee.paymentDate).toLocaleString()}
//                   </p>
//                 </div>

//                 <hr className="border-gray-300 dark:border-gray-700" />

//                 <div className="text-right text-xs text-gray-500">
//                   Receipt ID: {fee._id}
//                 </div>
//               </CardContent>
//             </Card>