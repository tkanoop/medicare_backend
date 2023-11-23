
import BaseTable from '../../components/baseTable'
import React, { useEffect, useState } from 'react'

import axios from "../../instance/axios"
import { NavLink, Navigate } from 'react-router-dom'
import AdminNavbar from '../../components/Sidebar'
import { ClipLoader } from 'react-spinners'
import { useAuthContext } from '../../hooks/admin/useAuthContext'
import AdminTopbar from '../../components/AdminTopbar'
import Swal from 'sweetalert2';


const DepartmentView = () => {
    const {admin}=useAuthContext()
    const [department, setDepartment] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const getDepartments = async () => {
        try {
            const response = await axios.get("/api/admin/getDepartments",{
                headers:{
                    'Authorization': `${admin.token}`
                }
            })

            setDepartment(response.data)
            console.log(department);
            if(response.data.message){
                Navigate('/login')
            }


        } catch (error) {
           

        }finally {
            setIsLoading(false);
          }
    };

    const handleEdit = async (id) => {
        try {
            const confirmed = await Swal.fire({
                icon: 'question',
                text: 'Are you sure you want to do this?',
                showCancelButton: true,
                confirmButtonText: 'Yes!',
                cancelButtonText: 'No, cancel',
              });
        
              if (confirmed.value === true) {
            const response = await axios.get(`/api/admin/blockdepartments/${id}`);
           getDepartments()
        }
     } catch (error) {
            
        }
    }


    const columns = [
      
        {
            name: "Department",
            selector: row => row.department
        },
      
      
        {
            name:"Photo",
            selector:(row) => <img width={50} height={50} src={row.image}/>
        },
        {
            name: "Action",
            cell: (row) => (
                <>
               
                <button onClick={()=>handleEdit(row._id)} className={`${row.status?"bg-green-700" : "bg-red-700"} px-2 py-1 text-white rounded-md w-[120px]`}
>
                    {row.status ? "Block":"Unblock"}

                </button>
                </>
            
            )
        }

    ];
    useEffect(() => {
        getDepartments();
    }, []);

    return (
        <>
        <div>
            <AdminTopbar/>
        </div>
            <div className='flex gap-24'>
                <div>
                    <AdminNavbar />
                </div>
                <div className='d-flex w-full flex-column align-items-center mr-24'>
                <div className='flex justify-end mb-4'>
                <NavLink to="/admin/addDepartment">
                <button class="  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5 mb-5">
            Add Department
          </button>
          </NavLink>
          </div>
          {isLoading ? (
 <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto' }}>
  <ClipLoader css="display: block; margin: 0 auto; border-color: red;" size={200} color={"teal-900"} loading={true} />
  </div>
) : (

                    <BaseTable
                        columns={columns}
                        data={department}
                        title={"Departments"}
                    />
                    )}

                </div>
            </div>
        </>
    )
}

export default DepartmentView