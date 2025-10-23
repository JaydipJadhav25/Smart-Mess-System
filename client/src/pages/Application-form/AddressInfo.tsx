// import {  useEffect } from "react";
import { useForm } from "react-hook-form";

export default function AddressInfo({ next, back, data } : any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // watch,
    // setValue,
  } = useForm({
    defaultValues: {
      permanentAddress: data.permanentAddress || "",
      permanentState: data.permanentState || "Maharashtra",
      permanentDistrict: data.permanentDistrict || "",
      permanentTaluka: data.permanentTaluka || "",
      permanentVillage: data.permanentVillage || "",
      permanentPincode: data.permanentPincode || "",
      // correspondenceSame: data.correspondenceSame !== undefined ? data.correspondenceSame : true,
      // correspondenceAddress: data.correspondenceAddress || "",
      // correspondenceState: data.correspondenceState || "Maharashtra",
      // correspondenceDistrict: data.correspondenceDistrict || "",
      // correspondenceTaluka: data.correspondenceTaluka || "",
      // correspondenceVillage: data.correspondenceVillage || "",
      // correspondencePincode: data.correspondencePincode || "",
    },
  });

  // const correspondenceSame = watch("correspondenceSame");

  // useEffect(() => {
  //   if (correspondenceSame) {
  //     setValue("correspondenceAddress", watch("permanentAddress"));
  //     setValue("correspondenceState", watch("permanentState"));
  //     setValue("correspondenceDistrict", watch("permanentDistrict"));
  //     setValue("correspondenceTaluka", watch("permanentTaluka"));
  //     setValue("correspondenceVillage", watch("permanentVillage"));
  //     setValue("correspondencePincode", watch("permanentPincode"));
  //   }
  // }, [correspondenceSame, watch, setValue]);

  const onSubmit = (formData : any) => next(formData);

  return (
    <div>
      <div className="border-b border-orange-200 pb-4 mb-6 dark:text-white">
        <h2 className="text-2xl font-bold text-orange-600">Permanent Address Details (AY 2024-2025)</h2>
        <p className="text-red-500 text-sm mt-1">All * marks fields are mandatory</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Permanent Address */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address*</label>
            <textarea
              {...register("permanentAddress", { required: "Address required" })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Enter full address"
            />
            {/* {errors.permanentAddress && <p className="text-red-500 text-sm mt-1">{errors.permanentAddress.message}</p>} */}
            {
              errors.permanentAddress && typeof errors.permanentAddress.message === "string" &&(
                <p className="text-red-500 text-sm mt-1">{errors.permanentAddress.message}</p>
              )
            }
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">State*</label>
            <input
              value="Maharashtra"
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-background"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">District*</label>
            <select
              {...register("permanentDistrict", { required: "District required" })}
              className="w-full px-4 py-2 bg-background  border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Select...</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Pune">Pune</option>
              <option value="Satara">Satara</option>
              <option value="Nashik">Nashik</option>
            </select>
            {/* {errors.permanentDistrict && <p className="text-red-500 text-sm mt-1">{errors.permanentDistrict.message}</p>} */}
            {
              errors.permanentDistrict && typeof errors.permanentDistrict.message === "string" &&(
                <p className="text-red-500 text-sm mt-1">{errors.permanentDistrict.message}</p>
              )
            }
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Taluka*</label>
            <select
              {...register("permanentTaluka", { required: "Taluka required" })}
              className="w-full px-4 py-2 bg-background border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Select...</option>
              <option value="Phaltan">Phaltan</option>
              <option value="Satara">Satara</option>
              <option value="Koregaon">Koregaon</option>
            </select>
            {/* {errors.permanentTaluka && <p className="text-red-500 text-sm mt-1">{errors.permanentTaluka.message}</p>} */}
            {
              errors.permanentTaluka && typeof errors.permanentTaluka.message === "string" &&(
                <p className="text-red-500 text-sm mt-1">{errors.permanentTaluka.message}</p>
              )
            }
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Village*</label>
            <input
              {...register("permanentVillage", { required: "Village required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Village name"
            />
            {/* {errors.permanentVillage && <p className="text-red-500 text-sm mt-1">{errors.permanentVillage.message}</p>} */}
            {
              errors.permanentVillage && typeof errors.permanentVillage.message === "string" &&(
                <p className="text-red-500 text-sm mt-1">{errors.permanentVillage.message}</p>
              )
            }
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pincode*</label>
            <input
              {...register("permanentPincode", {
                required: "Pincode required",
                pattern: { value: /^\d{6}$/, message: "Enter valid 6-digit pincode" }
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="415522"
            />
            {/* {errors.permanentPincode && <p className="text-red-500 text-sm mt-1">{errors.permanentPincode.message}</p>} */}
            {
              errors.permanentPincode && typeof errors.permanentPincode.message === "string" &&(
                <p className="text-red-500 text-sm mt-1">{errors.permanentPincode.message}</p>
              )
            }
          </div>
        </div>

        {/* Correspondence Address Same Check */}
        {/* <div className="mt-8">
          <label className="block text-sm font-medium text-gray-700 mb-4">Is Correspondence Address same as Permanent?</label>
          <div className="flex space-x-6">
            <label className="flex items-center">
              <input
                type="radio"
                {...register("correspondenceSame")}
                value={true}
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Yes</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                {...register("correspondenceSame")}
                value={false}
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">No</span>
            </label>
          </div>
        </div> */}

        {/* Correspondence Address Details - Show only if different */}
        {/* {!correspondenceSame && (
          <div className="mt-8 border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Correspondence Address Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address*</label>
                <textarea
                  {...register("correspondenceAddress", { required: "Address required" })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {errors.correspondenceAddress && <p className="text-red-500 text-sm mt-1">{errors.correspondenceAddress.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State*</label>
                <input
                  value="Maharashtra"
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">District*</label>
                <select
                  {...register("correspondenceDistrict", { required: "District required" })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select...</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Pune">Pune</option>
                  <option value="Satara">Satara</option>
                </select>
                {errors.correspondenceDistrict && <p className="text-red-500 text-sm mt-1">{errors.correspondenceDistrict.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Taluka*</label>
                <select
                  {...register("correspondenceTaluka", { required: "Taluka required" })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select...</option>
                  <option value="Phaltan">Phaltan</option>
                  <option value="Satara">Satara</option>
                </select>
                {errors.correspondenceTaluka && <p className="text-red-500 text-sm mt-1">{errors.correspondenceTaluka.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Village*</label>
                <input
                  {...register("correspondenceVillage", { required: "Village required" })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {errors.correspondenceVillage && <p className="text-red-500 text-sm mt-1">{errors.correspondenceVillage.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pincode*</label>
                <input
                  {...register("correspondencePincode", {
                    required: "Pincode required",
                    pattern: { value: /^\d{6}$/, message: "Enter valid pincode" }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {errors.correspondencePincode && <p className="text-red-500 text-sm mt-1">{errors.correspondencePincode.message}</p>}
              </div>
            </div>
          </div>
        )} */}

        {/* Action Buttons */}
        <div className="flex sm:justify-between pt-6">
          <button
            type="button"
            onClick={back}
            className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Back
          </button>
          <div className="space-x-4 flex justify-center items-center">
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
