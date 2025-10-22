

export default function ReviewSubmit({ data , back }:any) {
  const handleSubmit = () => {
    // API call to submit the form
    console.log("Submitting form data:", data);
    alert("Application submitted successfully!");
    // Navigate to success page or dashboard
  };

  return (
    <div>
      <div className="border-b border-orange-200 pb-4 mb-6">
        <h2 className="text-2xl font-bold text-orange-600">Review Your Application</h2>
        <p className="text-gray-600">Please review all information before submitting</p>
      </div>

      <div className="space-y-8">
        {/* Personal Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm dark:text-black">
            <div><span className="font-medium">Aadhaar:</span> {data.aadhaar}</div>
            <div><span className="font-medium">Name:</span> {data.name}</div>
            <div><span className="font-medium">Date of Birth:</span> {data.dob}</div>
            <div><span className="font-medium">Gender:</span> {data.gender}</div>
            <div><span className="font-medium">Email:</span> {data.email}</div>
            <div><span className="font-medium">Mobile:</span> {data.mobile}</div>
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Address Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm dark:text-black">
            <div><span className="font-medium">Permanent Address:</span> {data.permanentAddress}</div>
            <div><span className="font-medium">District:</span> {data.permanentDistrict}</div>
            <div><span className="font-medium">Taluka:</span> {data.permanentTaluka}</div>
            <div><span className="font-medium">Village:</span> {data.permanentVillage}</div>
            <div><span className="font-medium">Pincode:</span> {data.permanentPincode}</div>
          </div>
        </div>

        {/* Parent/Guardian Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Parent/Guardian Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm dark:text-black">
            <div><span className="font-medium">Father Name:</span> {data.fatherName}</div>
            <div><span className="font-medium">Father Occupation:</span> {data.fatherOccupation}</div>
            <div><span className="font-medium">Mother Name:</span> {data.motherName}</div>
            <div><span className="font-medium">Mother Occupation:</span> {data.motherOccupation}</div>
          </div>
        </div>

        {/* Current Course */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Current Course</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm dark:text-black">
            <div><span className="font-medium">Course:</span> {data.course}</div>
            <div><span className="font-medium">Year:</span> {data.year}</div>
            <div><span className="font-medium">College:</span> {data.college}</div>
            <div><span className="font-medium">Branch:</span> {data.branch}</div>
          </div>
        </div>

        {/* Past Qualification */}
        {/* <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Past Qualification</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div><span className="font-medium">Previous School:</span> {data.previousSchool}</div>
            <div><span className="font-medium">Board:</span> {data.board}</div>
            <div><span className="font-medium">Passing Year:</span> {data.passingYear}</div>
            <div><span className="font-medium">Percentage:</span> {data.percentage}</div>
          </div>
        </div> */}

        {/* Hostel Details */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Hostel/Mess Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm dark:text-black">
            <div><span className="font-medium">Mess Preference:</span> {data.messPreference}</div>
            <div><span className="font-medium">Room Type:</span> {data.roomType}</div>
            <div><span className="font-medium">Room No:</span> {data.roomno}</div>
            {/* <div><span className="font-medium">Dietary Restrictions:</span> {data.dietaryRestrictions || 'None'}</div> */}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between pt-8">
        <button
          onClick={back}
          className="px-8 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 font-medium"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="px-8 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 font-medium"
        >
          Submit Application
        </button>
      </div>
    </div>
  );
}
