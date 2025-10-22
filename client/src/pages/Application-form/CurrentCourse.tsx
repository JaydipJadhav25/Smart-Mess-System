// import React from "react";
import { useForm } from "react-hook-form";

export default function CurrentCourse({ next, back, data } : any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      course: data.course || "",
      year: data.year || "",
      college: data.college || "Rajgad Technical Campus",
      branch: data.branch || "",
    },
  });

  const onSubmit = (formData : any) => next(formData);

  return (
    <div>
      <div className="border-b border-orange-200 pb-4 mb-6">
        <h2 className="text-2xl font-bold text-orange-600">Current Course Details</h2>
        <p className="text-red-500 text-sm mt-1">All * marks fields are mandatory</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Course Name*</label>
            <select
              {...register("course", { required: "Course name is required" })}
              className="w-full px-4 py-2 bg-background border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Select Course</option>
              <option value="B.Tech">B.Tech</option>
              <option value="BE">BE</option>
              <option value="B.Sc">B.Sc</option>
              <option value="BCA">BCA</option>
              <option value="MBA">MBA</option>
              <option value="M.Tech">M.Tech</option>
            </select>
            {errors.course && <p className="text-red-500 text-sm mt-1">"Course name is required</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Year (1-4)*</label>
            <select
              {...register("year", { required: "Year is required" })}
              className="w-full px-4 py-2 bg-background border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Select Year</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
            {errors.year && <p className="text-red-500 text-sm mt-1">Year is required</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">College Name*</label>
            <input
            value={"Rajgad Technical Campus"}
            disabled
              // {...register("college", { required: "College name is required" })}
               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              // placeholder="Enter college name"
            />
            {/* {errors.college && <p className="text-red-500 text-sm mt-1">College name is required</p>} */}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Branch/Department*</label>
            <input
              {...register("branch", { required: "Branch is required" })}
              className="w-full px-4 py-2 bg-background border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="e.g., Computer Science"
            />
            {errors.branch && <p className="text-red-500 text-sm mt-1">"Branch is required</p>}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={back}
            className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Back
          </button>
          <div className="space-x-4">
            <button
              type="button"
              className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
