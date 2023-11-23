import React from 'react'
import DocSideBar from '../../components/Docsidebar'
import DocProfile from '../../components/DocProfile'
import DoctorTopbar from '../../components/DoctorTopbar'

function Profile() {
  return (
  <>
  <div>
    <DoctorTopbar/>
  </div>
  <div className='flex gap-24'>
    <div>
    <DocSideBar/>
    </div>
    <div className='flex mt-12'>
    <DocProfile/>
    </div>
    
  </div>
  </>
   
  )
}

export default Profile