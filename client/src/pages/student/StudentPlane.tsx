// import React from 'react'
import { ComingSoon } from '@/components/ComingSoon'
import StudentLayout from '../../components/students/StudentLayout'


function StudentPlane() {
  return (
    <StudentLayout currentPage='plane'>
     
    <div className='flex justify-center items-center h-screen'>
       <ComingSoon/>
    </div>


    </StudentLayout>
  )
}

export default StudentPlane