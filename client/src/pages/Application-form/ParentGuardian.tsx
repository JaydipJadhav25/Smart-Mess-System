
import { useForm } from "react-hook-form";

export default function ParentGuardian({ next, back, data } : any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fatherAlive: data.fatherAlive || "yes",
      fatherName: data.fatherName || "",
      fatherOccupation: data.fatherOccupation || "",
      fatherSalaried: data.fatherSalaried || "no",
      motherAlive: data.motherAlive || "yes",
      motherName: data.motherName || "",
      motherOccupation: data.motherOccupation || "",
      motherSalaried: data.motherSalaried || "no",
    },
  });

  const onSubmit = (formData:any) => next(formData);

  return (
    <div>
      <div className="border-b border-orange-200 pb-4 mb-6">
        <h2 className="text-2xl font-bold text-orange-600">Parent's/Guardian's Details (AY 2024-2025)</h2>
        <p className="text-red-500 text-sm mt-1">All * marks fields are mandatory</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Father Details */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Is Father Alive?*</label>
            <div className="flex space-x-6">
              <label className="flex items-center">
                <input
                  {...register("fatherAlive", { required: true })}
                  type="radio"
                  value="yes"
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  {...register("fatherAlive", { required: true })}
                  type="radio"
                  value="no"
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">No</span>
              </label>
            </div>
            {errors.fatherAlive && <p className="text-red-500 text-sm mt-1">This field is required</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Father Name*</label>
            <input
              {...register("fatherName", { required: "Father name is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Father's name"
            />
            {/* {errors.fatherName && <p className="text-red-500 text-sm mt-1">{errors.fatherName.message}</p>} */}
            {
              errors.fatherName && typeof errors.fatherName.message === "string" && (
                <p className="text-red-500 text-sm mt-1">{errors.fatherName.message}</p>
              )
            }
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Occupation*</label>
            <select
              {...register("fatherOccupation", { required: "Required" })}
              className="w-full px-4 py-2 bg-background border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Select</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Business">Business</option>
              <option value="Service">Service</option>
              <option value="Other">Other</option>
            </select>
           
            {/* {errors.fatherOccupation && <p className="text-red-500 text-sm mt-1">{errors.fatherOccupation.message}</p>} */}
           {
              errors.fatherOccupation && typeof errors.fatherOccupation.message === "string" && (
                <p className="text-red-500 text-sm mt-1">{errors.fatherOccupation.message}</p>
              )
            }
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Is Salaried?*</label>
            <select
              {...register("fatherSalaried", { required: "Required" })}
              className="w-full px-4 py-2 bg-background border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
            {/* {errors.fatherSalaried && <p className="text-red-500 text-sm mt-1">{errors.fatherSalaried.message}</p>} */}
          {
              errors.fatherSalaried && typeof errors.fatherSalaried.message === "string" && (
                <p className="text-red-500 text-sm mt-1">{errors.fatherSalaried.message}</p>
              )
            }
          </div>
        </div>

        {/* Mother Details */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Is Mother Alive?*</label>
            <div className="flex space-x-6">
              <label className="flex items-center">
                <input
                  {...register("motherAlive", { required: true })}
                  type="radio"
                  value="yes"
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  {...register("motherAlive", { required: true })}
                  type="radio"
                  value="no"
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">No</span>
              </label>
            </div>
            {errors.motherAlive && <p className="text-red-500 text-sm mt-1">This field is required</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mother Name*</label>
            <input
              {...register("motherName", { required: "Mother name is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Mother's name"
            />
            {errors.motherName && <p className="text-red-500 text-sm mt-1">Mother name is required</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Occupation*</label>
            <select
              {...register("motherOccupation", { required: "Required" })}
              className="w-full px-4 py-2 bg-background border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Select</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Business">Business</option>
              <option value="Service">Service</option>
              <option value="Housewife">Housewife</option>
              <option value="Other">Other</option>
            </select>
            {errors.motherOccupation && <p className="text-red-500 text-sm mt-1">mother Occupation is required</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Is Salaried?*</label>
            <select
              {...register("motherSalaried", { required: "Required" })}
              className="w-full px-4 py-2 bg-background border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
            {errors.motherSalaried && <p className="text-red-500 text-sm mt-1">required</p>}
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
