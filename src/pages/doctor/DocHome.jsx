import React from 'react'
import DocSideBar from '../../components/Docsidebar'
import { useAuthContext } from '../../hooks/admin/useAuthContext'
import DoctorTopbar from '../../components/DoctorTopbar'



export default function DocHome() {
 
  return (
    <>
    <div>
      <DoctorTopbar/>
    </div>
    
    <div className='flex'>

    <DocSideBar/>
   <div>
    Dashboard
   </div>
    </div>
    </>
  )
}

