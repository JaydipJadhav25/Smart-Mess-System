// import React from 'react'
import useAuth from '@/components/context/useAuth'
import StudentLayout from '../../components/students/StudentLayout'
import MessAdmissionWizard from '../MessAdmissionWizard'
import FormStatus from '@/components/students/FormStatus';

function StudentForm() {


  const{isFormSubmitted} = useAuth();



  return (
    <StudentLayout currentPage='form'>
        
       <main>
             {
              isFormSubmitted ? <>
            {/* <h1>Form successfully sumbited!</h1> */}
            <FormStatus />
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