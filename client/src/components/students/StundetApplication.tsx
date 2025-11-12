import { axiosInstance } from "@/config/axiosInstances";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StundetApplication() {
  const navigate = useNavigate();
  const [data, setData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchApplication() {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axiosInstance.get("/user/appplication/get");
        console.log("Response:", response);
        // store data in state
        setData(response.data?.application || response.data || {});
      } catch (err: any) {
        console.error("Error fetching application:", err);
        setError("Failed to load application details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchApplication(); 
  }, []);






  //  Loading and error states
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Loading application details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-red-600">
        <p>{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="border-b border-orange-200 pb-4 mb-6">
        <h2 className="text-2xl font-bold text-orange-600">Application confirmed</h2>
        <p className="text-gray-600">Congratulations! Your mess admission form has been accepted.</p>
      </div>

      <div className="space-y-8">
        {/* Personal Information */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
            <div><span className="font-medium">Aadhaar:</span> {data.aadhaar}</div>
            <div><span className="font-medium">Name:</span> {data.name}</div>
            <div><span className="font-medium">Date of Birth:</span> {data.dob}</div>
            <div><span className="font-medium">Gender:</span> {data.gender}</div>
            <div><span className="font-medium">Email:</span> {data.email}</div>
            <div><span className="font-medium">Mobile:</span> {data.mobile}</div>
          </div>
        </section>

        {/* Address Information */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Address Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
            <div><span className="font-medium">Permanent Address:</span> {data.permanentAddress}</div>
            <div><span className="font-medium">District:</span> {data.permanentDistrict}</div>
            <div><span className="font-medium">Taluka:</span> {data.permanentTaluka}</div>
            <div><span className="font-medium">Village:</span> {data.permanentVillage}</div>
            <div><span className="font-medium">Pincode:</span> {data.permanentPincode}</div>
          </div>
        </section>

        {/* Parent/Guardian Information */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Parent/Guardian Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
            <div><span className="font-medium">Father Name:</span> {data.fatherName}</div>
            <div><span className="font-medium">Father Occupation:</span> {data.fatherOccupation}</div>
            <div><span className="font-medium">Mother Name:</span> {data.motherName}</div>
            <div><span className="font-medium">Mother Occupation:</span> {data.motherOccupation}</div>
          </div>
        </section>

        {/* Current Course */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Current Course</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
            <div><span className="font-medium">Course:</span> {data.course}</div>
            <div><span className="font-medium">Year:</span> {data.year}</div>
            <div><span className="font-medium">College:</span> {data.college}</div>
            <div><span className="font-medium">Branch:</span> {data.branch}</div>
          </div>
        </section>

        {/* Hostel Details */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Hostel / Mess Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
            <div><span className="font-medium">Mess Preference:</span> {data.messPreference}</div>
            <div><span className="font-medium">Room Type:</span> {data.roomType}</div>
            <div><span className="font-medium">Room No:</span> {data.roomno}</div>
          </div>
        </section>
      </div>

      {/* Action Buttons */}
      {/* <div className="flex justify-between pt-8">
        <button
          onClick={() => navigate(-1)}
          className="px-8 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 font-medium"
        >
          Back
        </button>
        <button
        hidden={  data.isAccepted}
        onClick={()=>accepteApplication(data._id)}
        className="px-8 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 font-medium">
        {
          isLoading ? "loading" : "Accecpte"
        }
        </button> */}
      {/* </div> */}
    </div>
  );
}
