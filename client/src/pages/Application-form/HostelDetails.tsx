// import React from "react";
import { useForm } from "react-hook-form";

export default function HostelDetails({ next, back, data }:any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      messPreference: data.messPreference || "",
      dietaryRestrictions: data.dietaryRestrictions || "",
      roomno: data.roomno || "",
      roomType: data.roomType || "",
    },
  });

  const onSubmit = (formData : any) => next(formData);

  return (
    <div>
      <div className="border-b border-orange-200 pb-4 mb-6">
        <h2 className="text-2xl font-bold text-orange-600">Hostel / Mess Details</h2>
        <p className="text-red-500 text-sm mt-1">All * marks fields are mandatory</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mess Preference*</label>
            <select
              {...register("messPreference")}
              className="w-full px-4 py-2 bg-background border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Select Mess</option>
              <option value="veg">Vegetarian Mess</option>
              <option value="non-veg">Non-Vegetarian Mess</option>
              <option value="both">Both</option>
            </select>
            {/* {errors.messPreference && <p className="text-red-500 text-sm mt-1">Required</p>} */}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Room Type Preference*</label>
            <select
              {...register("roomType")}
              className="w-full px-4 py-2 bg-background border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Select Room Type</option>
              <option  defaultChecked value="single">Single Room</option>
              <option value="double">Double Sharing</option>
              <option value="triple">Triple Sharing</option>
            </select>
            {/* {errors.roomType && <p className="text-red-500 text-sm mt-1">required</p>} */}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Room No*</label>
            <input
              {...register("roomno", { required: "Required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="e.g., 101"
            />
            {errors.roomno && <p className="text-red-500 text-sm mt-1">"Room No required</p>}
          </div>

          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Restrictions</label>
            <textarea
              {...register("dietaryRestrictions")}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Any specific dietary requirements or allergies"
            />
          </div> */}
          
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
