// import React from 'react'
// import useAuth from '@/components/context/useAuth'
import StudentLayout from '../../components/students/StudentLayout'
import MessAdmissionWizard from '../MessAdmissionWizard'
import FormStatus from '@/components/students/FormStatus';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/config/axiosInstances';
import StundetApplication from '@/components/students/StundetApplication';
import { Loader2 } from 'lucide-react';

function StudentForm() {


  // const{isFormSubmitted } = useAuth();

 const { data, isError, isLoading, error } = useQuery({
  queryKey: ["profile"],
  queryFn: async () => {
    const response = await axiosInstance.get("/user/myProfile");
    return response.data;
  },
  staleTime: Infinity,         // cache never becomes stale
  gcTime: Infinity,            // keep it in cache forever
  refetchOnWindowFocus: false, 
  refetchOnReconnect: false,  
  refetchOnMount: false,       
});


  // Loading state
  if (isLoading) {
    return (
      <StudentLayout currentPage="profile">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
          <span className="ml-2 text-gray-500">Loading profile...</span>
        </div>
      </StudentLayout>
    );
  }

  // Error state
  if (isError) {
    return (
      <StudentLayout currentPage="profile">
        <div className="text-center text-red-500 mt-10">
          <h2 className="text-xl font-semibold">Failed to load profile</h2>
          <p className="text-gray-600">{error?.message}</p>
        </div>
      </StudentLayout>
    );
  }



  return (
    <StudentLayout currentPage='form'>
        
       <main>
             {
              data?.isFormSubmitted? <>
             {/* chekc form status  */}
               {
                data?.formState === "pending"? <FormStatus/>:
                <StundetApplication/>
               }
            </> :
            <>
            <MessAdmissionWizard/>
            </>
           }
       </main>
    </StudentLayout>
  )
}

export default StudentForm