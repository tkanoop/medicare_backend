import React from 'react'
import AdminNavbar from '../../components/Sidebar'
import AdminTopbar from '../../components/AdminTopbar'
import Dashboard from '../../components/Dashboard'
const AdminDashboard = () => {
  return (
    <>
    <div>
            <AdminTopbar/>
        </div>
        <div className='flex gap-24'>
          <div>
    
      <AdminNavbar/>
      </div>
      <Dashboard/>
      </div>
    
    </>
  )
}

export default AdminDashboard