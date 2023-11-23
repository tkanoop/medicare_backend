
import BaseTable from '../../components/baseTable'
import React, { useEffect, useState } from 'react'


import axios from "../../instance/axios"
import AdminNavbar from '../../components/Sidebar'
import { Await, NavLink } from 'react-router-dom'
import {ClipLoader} from 'react-spinners'
import AdminTopbar from '../../components/AdminTopbar'
import { GetDoctorsApi } from '../../services/api'
import { useAuthContext } from '../../hooks/admin/useAuthContext'


const DoctorView = () => {
    const {admin} = useAuthContext()
    const [doctor, setDoctor] = useState([])
    
    const [isLoading, setIsLoading] = useState(true)
    const getDoctors = async () => {
        try {
         
            const response = await axios.get("/api/admin/getDoctors", {
                headers: {
                  Authorization : `${admin.token}`
                },
              });    
              
            console.log("hello");
            const doctorsWithBlockedStatus = response.data.map((doc) => {
                return {
                    ...doc,
                    blocked: doc.status === "blocked"
                };
            });
            setDoctor(doctorsWithBlockedStatus);
            console.log(doctorsWithBlockedStatus);
        } catch (error) {
            
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleEdit = async (id) => {
        try {
            console.log("dfdfgdf" + id);
            const response = await axios.get(`/api/admin/blockdoctor/${id}`);
           getDoctors()
        } catch (error) {
            
        }
    }
    
    const columns = [
        {
            name: "Name",
            selector: row => row.name
        },
        {
            name: "Department",
            selector: row => row.department
        },
        {
            name: "Speciality",
            selector: row => row.speciality
        },
        {
            name: "Mobile",
            selector: row => row.mobile

        },
        {
            name: "Email",
            selector: row => row.email
        },
        {
            name: "Hospitals",
            selector: row => row.hospitals
        },
        {
            name: "Photo",
            selector: (row) => <img width={50} height={50} src={row.image} />
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
        getDoctors();
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
                <div className='d-flex w-full  align-items-center mr-24'>
                    <div className='flex justify-end mb-4'>
                        <NavLink to="/admin/addDoctor">
                            <button class="  bg-green-700 hover:bg-teal-900 text-white font-bold py-2 px-4 rounded-full mt-5 ml-auto">
                                Add Doctor
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
    data={doctor}
    title={"Doctors"}
  />
)}

                </div>
            </div>
        </>
    )
}

export default DoctorView


