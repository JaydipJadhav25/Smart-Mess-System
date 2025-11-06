import useAuth from "@/components/context/useAuth";
import Popup from "@/components/ui/Popup";
import  { useState } from "react";
import { useForm } from "react-hook-form";



export default function PersonalInfo({ next , data }:{next : any , data : any}) {
      const [showToast, setShowToast] = useState(false);

        const {username} = useAuth();




  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      aadhaar: data.aadhaar || "",
      name: data.name || "",
      dob: data.dob || "",
      gender: data.gender || "",
      email: username || "",
      mobile: data.mobile || "",
    },
  });

//   const onSubmit = (formData) => next(formData);

console.log("errors "  , errors);





  const onSubmit = (formData:any) => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      next(formData);
    }, 2000); // show toast for 2 seconds
  };

  return (
    <div>
        {/* popup */}
          {/* <Popup show={showToast} message="Personal Information saved successfully!"/> */}
          
      <div className="border-b border-orange-200 pb-4 mb-6">
        <h2 className="text-2xl font-bold text-orange-600">Personal Details</h2>
        <p className="text-red-500 text-sm mt-1">All * marks fields are mandatory</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Aadhaar Number */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Aadhaar Number*
            </label>
            <div className="flex space-x-2">
              <input
                {...register("aadhaar", { 
                  required: "Aadhaar is required", 
                  pattern: { value: /^\d{12}$/, message: "Enter valid 12-digit Aadhaar" }
                })}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="XXXXXXXXXXXX"
              />
              <button
                type="button"
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
              >
                Update Profile as per Aadhaar
              </button>
            </div>
            {/* {errors.aadhaar && <p className="text-red-500 text-sm mt-1">{errors.aadhaar.message}</p>} */}
            {errors.aadhaar && typeof errors.aadhaar.message === "string" && (
                <p className="text-red-500 text-sm mt-1">{errors.aadhaar.message}</p>
              )}
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Name*</label>
          <input
            {...register("name", { required: "Name is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Full Name as per Aadhaar"
          />
          {/* {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>} */}
          {
            errors.name && typeof errors.name.message === "string" &&(
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )
          }
          
        </div>

        {/* Email with verification */}
        <div className="bg-backgroud border border-red-200 rounded-md p-4">
          <div className="flex items-center space-x-2 text-red-600 mb-3">
            <span>ℹ️</span>
            <span className="text-sm">Note: If you enter/change the Email ID then verification is mandatory and OTP will send to entered Email ID.</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-amber-50 mb-2">Email ID*</label>
              <input
               value={username|| ""}
               readOnly
                type="email"
                // {...register("email", { 
                //   required: "Email required",
                //   pattern: { value: /^\S+@\S+$/i, message: "Enter valid email" }
                // })}
                {...register("email")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="your@email.com"
              />
              {/* {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>} */}
              {
            errors.email && typeof errors.email.message === "string" &&(
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )
          }
            </div>
            <div className="flex items-end">
              <span className="px-4 py-2 bg-green-500 text-white rounded-md text-sm">
                ✓ EMAIL ID VERIFIED
              </span>
            </div>
          </div>
        </div>

        {/* Mobile with verification */}
        <div className="bg-backgroud border border-red-200 rounded-md p-4">
          <div className="flex items-center space-x-2 text-red-600 mb-3">
            <span>ℹ️</span>
            <span className="text-sm">Note: If you change the Mobile Number then verification is mandatory and OTP will send to entered Mobile Number.</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number*</label>
              <input
                {...register("mobile", {
                  required: "Mobile number required",
                  pattern: { value: /^\d{10}$/, message: "Enter valid 10-digit mobile number" }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="1234567890"
              />
              {/* {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>} */}
              {
            errors.mobile && typeof errors.mobile.message === "string" &&(
              <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>
            )
          }
            </div>
            <div className="flex items-end">
              <span className="px-4 py-2 bg-green-500 text-white rounded-md text-sm">
                ✓ MOBILE NUMBER VERIFIED
              </span>
            </div>
          </div>
        </div>

        {/* Date of Birth */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth*</label>
            <input
              type="date"
              {...register("dob", { required: "DOB is required" })}
              className="w-full px-4 py-2 dark:text-white border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            {/* {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>} */}
            {
            errors.dob && typeof errors.dob.message === "string" &&(
              <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>
            )
          }
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender*</label>
            <select
              {...register("gender", { required: "Gender is required" })}
              className="w-full px-4 py-2 bg-background border border-gray-300 dark:text-white rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {/* {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>} */}
            {
            errors.gender && typeof errors.gender.message === "string" &&(
              <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
            )
          }
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-6">
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
      </form>
    </div>
  );
}
