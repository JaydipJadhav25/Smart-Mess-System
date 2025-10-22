// import React from "react";
// import { useForm } from "react-hook-form";

// export default function PastQualification({ next, back, data }) {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       previousSchool: data.previousSchool || "",
//       passingYear: data.passingYear || "",
//       percentage: data.percentage || "",
//       board: data.board || "",
//     },
//   });

//   const onSubmit = (formData) => next(formData);

//   return (
//     <div>
//       <div className="border-b border-orange-200 pb-4 mb-6">
//         <h2 className="text-2xl font-bold text-orange-600">Past Qualification Details</h2>
//         <p className="text-red-500 text-sm mt-1">All * marks fields are mandatory</p>
//       </div>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Previous School/College*</label>
//             <input
//               {...register("previousSchool", { required: "This field is required" })}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//               placeholder="School/College name"
//             />
//             {errors.previousSchool && <p className="text-red-500 text-sm mt-1">{errors.previousSchool.message}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Board/University*</label>
//             <input
//               {...register("board", { required: "Board is required" })}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//               placeholder="e.g., Maharashtra State Board"
//             />
//             {errors.board && <p className="text-red-500 text-sm mt-1">{errors.board.message}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Year of Passing*</label>
//             <input
//               type="number"
//               {...register("passingYear", { required: "Year is required", min: 1990, max: 2030 })}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//               placeholder="e.g., 2023"
//             />
//             {errors.passingYear && <p className="text-red-500 text-sm mt-1">{errors.passingYear.message}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Percentage / Result*</label>
//             <input
//               {...register("percentage", { required: "Required" })}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//               placeholder="e.g., 85.5% or A Grade"
//             />
//             {errors.percentage && <p className="text-red-500 text-sm mt-1">{errors.percentage.message}</p>}
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex justify-between pt-6">
//           <button
//             type="button"
//             onClick={back}
//             className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//           >
//             Back
//           </button>
//           <div className="space-x-4">
//             <button
//               type="button"
//               className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//             >
//               Reset
//             </button>
//             <button
//               type="submit"
//               className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
//             >
//               Save
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }
