// import React from 'react'
import StudentLayout from '../../components/students/StudentLayout'
import MessAdmissionWizard from '../MessAdmissionWizard'

function StudentForm() {
  return (
    <StudentLayout currentPage='form'>
           <MessAdmissionWizard/>
    </StudentLayout>
  )
}

export default StudentForm