import  { useState } from "react";
import PersonalInfo from "./Application-form/PersonalInfo";
import AddressInfo from "./Application-form/AddressInfo";
import ParentGuardian from "./Application-form/ParentGuardian";
import CurrentCourse from "./Application-form/CurrentCourse";
// import PastQualification from "./PastQualification";
import HostelDetails from "./Application-form/HostelDetails";
import ReviewSubmit from "./Application-form/ReviewSubmit";

import {
  User,
  MapPin,
  Users,
  BookOpen,
  Home,
  CheckCircle,
} from 'lucide-react';


// const steps = [
//   { name: "Personal Information", icon: "👤" },
//   { name: "Address Information", icon: "🏠" },
//   { name: "Parent/Guardian Details", icon: "👨‍👩‍👧‍👦" },
//   { name: "Current Course", icon: "📚" },
//   { name: "Past Qualification", icon: "🎓" },
//   { name: "Hostel Details", icon: "🏨" },
//   { name: "Review & Submit", icon: "✅" },
// ];

const steps = [
  { name: "Personal Information", icon: User },
  { name: "Address Information", icon: MapPin },
  { name: "Parent/Guardian Details", icon: Users },
  { name: "Current Course", icon: BookOpen },
  // { name: "Past Qualification", icon: GraduationCap },
  { name: "Hostel Details", icon: Home },
  { name: "Review & Submit", icon: CheckCircle },
];

export default function MessAdmissionWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({});

  const updateFormData = (newData : any) => {
    setFormData({ ...formData, ...newData });
  };

  const next = (data : any) => {
    updateFormData(data);
    setCurrentStep((prev) => prev + 1);
  };

  const back = () => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const StepDisplay = () => {
    switch (currentStep) {
      case 0: return <PersonalInfo next={next} data={formData} />;
      case 1: return <AddressInfo next={next} back={back} data={formData} />;
      case 2: return <ParentGuardian next={next} back={back} data={formData} />;
      case 3: return <CurrentCourse next={next} back={back} data={formData} />;
      // case 4: return <PastQualification next={next} back={back} data={formData} />;
      case 4: return <HostelDetails next={next} back={back} data={formData} />;
      case 5: return <ReviewSubmit back={back} data={formData} />;
      default: return <div>Invalid Step</div>;
    }
  };

  const progressPercent = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      {/* <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src="/logo.png" alt="Logo" className="h-12 w-12" />
              <h1 className="text-2xl font-bold text-orange-600">Mess Admission Portal</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Profile Completeness</span>
              <div className="bg-green-500 text-white px-3 py-1 rounded text-sm font-medium">
                {Math.round(progressPercent)}%
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="bg-background shadow-xl border-b border-gray-200 max-w-full">
  <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
      
      {/* Left: Logo, Title & Progress Info */}
      <div className="flex items-center space-x-4 sm:space-x-6">
        {/* <div className="relative group flex-shrink-0">
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl opacity-75 group-hover:opacity-100 transition duration-300 blur-sm"></div>
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="relative h-12 w-12 sm:h-16 sm:w-16 rounded-xl shadow-lg" 
          />
        </div> */}
        
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-orange-600 via-red-500 to-orange-700 bg-clip-text text-transparent">
            Mess Admission Portal
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-1">
            <p className="text-sm text-gray-600 flex items-center space-x-2">
              {/* <span>🏠</span> */}
              <span>Complete your application</span>
            </p>
            <div className="flex items-center space-x-2 mt-1 sm:mt-0">
              <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                Step {currentStep + 1}/{steps.length}
              </div>
              <span className="text-sm text-gray-500 hidden sm:inline">
                {steps[currentStep]?.name}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Progress Info & Actions */}
      <div className="flex items-center justify-between lg:justify-end space-x-4">
        
        {/* Progress Circle & Percentage */}
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-2xl sm:text-3xl font-bold text-green-600">
              {Math.round(progressPercent)}%
            </div>
            <div className="text-xs text-gray-500">
              {progressPercent === 100 ? 'Complete' : 'In Progress'}
            </div>
          </div>
          
          <div className="w-16 h-16 sm:w-20 sm:h-20 relative">
            <svg className="w-16 h-16 sm:w-20 sm:h-20 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-200"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-green-500 transition-all duration-700 ease-out"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray={`${progressPercent}, 100`}
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-xs font-bold text-green-600">
                  {currentStep + 1}/{steps.length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {/* <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="bg-blue-50 border border-blue-200 px-3 sm:px-4 py-2 rounded-lg">
            <div className="flex items-center space-x-2">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span className="text-xs sm:text-sm text-blue-700 font-medium">Help</span>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 px-3 sm:px-4 py-2 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs sm:text-sm text-green-700 font-medium hidden sm:inline">Auto-Save</span>
              <span className="text-xs sm:text-sm text-green-700 font-medium sm:hidden">Save</span>
            </div>
          </div>
        </div> */}

      </div>
    </div>

    {/* Bottom Progress Bar */}
    <div className="mt-4 sm:mt-6">
      <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 shadow-inner overflow-hidden">
        <div 
          className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 h-full rounded-full transition-all duration-700 ease-out shadow-sm relative overflow-hidden"
          style={{ width: `${progressPercent}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
        </div>
      </div>
      
      {/* Step indicators */}
      {/* <div className="absolute mt-[-6px] sm:mt-[-8px] w-full flex justify-between items-center px-1">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 transition-all duration-500 ${
              index <= currentStep
                ? 'bg-green-500 border-green-600 scale-110 shadow-lg'
                : 'bg-white border-gray-300'
            }`}
          />
        ))}
      </div> */}
      
    </div>
  </div>
</div>


      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex">
          {/* Sidebar */}
          {/* <div className="w-64 bg-white rounded-lg shadow-sm p-4 mr-6">
            <nav className="space-y-2">
              <a href="#" className="block text-orange-600 font-medium py-2 px-3 bg-orange-50 rounded">Home</a>
              <a href="#" className="block text-gray-700 py-2 px-3 hover:bg-gray-50 rounded">Profile</a>
              <a href="#" className="block text-gray-700 py-2 px-3 hover:bg-gray-50 rounded">All Schemes</a>
              <a href="#" className="block text-gray-700 py-2 px-3 hover:bg-gray-50 rounded">My Applied Scheme</a>
              <a href="#" className="block text-gray-700 py-2 px-3 hover:bg-gray-50 rounded">My Cancelled Scheme</a>
              <a href="#" className="block text-gray-700 py-2 px-3 hover:bg-gray-50 rounded">Right To Give Up</a>
              <a href="#" className="block text-gray-700 py-2 px-3 hover:bg-gray-50 rounded">Grievance/Suggestion</a>
              <a href="#" className="block text-gray-700 py-2 px-3 hover:bg-gray-50 rounded">Declaration Forms</a>
              <a href="#" className="block text-gray-700 py-2 px-3 hover:bg-gray-50 rounded">Notification</a>
            </nav>
          </div> */}

          {/* Main Content */}
          <div className="flex-1">
            {/* Progress Steps */}
            <div className="bg-backgroud rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between">

                {/* {steps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-medium ${
                      index <= currentStep ? 'bg-green-500' : 'bg-gray-300'
                    }`}>
                      {index < currentStep ? '✓' : step.icon}
                    </div>
                    <div className={`mt-2 text-xs text-center max-w-20 ${
                      index === currentStep ? 'text-orange-600 font-medium' : 'text-gray-500'
                    }`}>
                      {step.name}
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`absolute h-px w-16 mt-6 ml-20 ${
                        index < currentStep ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                    )}


                  </div>
                ))} */}

                {steps.map((step, index) => {
  const Icon = step.icon;
  return (
    <div key={index} className="relative flex flex-col items-center">
      {/* Step Circle */}
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${
          index < currentStep
            ? 'bg-green-500'
            : index === currentStep
            ? 'bg-orange-500'
            : 'bg-gray-300'
        }`}
      >
        {index < currentStep ? (
          <CheckCircle className="w-6 h-6" />
        ) : (
          <Icon className="w-6 h-6" />
        )}
      </div>

      {/* Step Label */}
      <div
        className={`mt-2 text-xs text-center max-w-[60px] ${
          index === currentStep
            ? 'text-orange-600 font-medium'
            : 'text-gray-500'
        }`}
      >
        {step.name}
      </div>

      {/* Connector Line */}
      {index < steps.length - 1 && (
        <div
          className={`absolute top-6 left-full w-12 h-1 ${
            index < currentStep ? 'bg-green-500' : 'bg-gray-300'
          }`}
        />
      )}
    </div>
  );
})}

              </div>
            </div>

            {/* Form Content */}
            <div className="bg-backgroud rounded-lg shadow-sm p-6">
              <StepDisplay />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
