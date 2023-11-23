
import BaseTable from '../../components/baseTable'
import React, { useEffect, useState } from 'react'

import axios from "../../instance/axios"
import AdminNavbar from '../../components/Sidebar'
import { ClipLoader } from 'react-spinners'
import { useAuthContext } from '../../hooks/admin/useAuthContext' 
import AdminTopbar from '../../components/AdminTopbar'
import Swal from 'sweetalert2';

const ClientView = () => {
    const{admin}=useAuthContext()
    const [client, setClient] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const getClients = async () => {
        try {
            const response = await axios.get("/api/admin/getClients",{
                headers:{
                  'Authorization': ` ${admin.token}`
                }
                })
            setClient(response.data)
            console.log(response.data);
 

        } catch (error) {

        }finally {
            setIsLoading(false);
          }
    };
    const handleEdit = async (id) => {
        try {
            const confirmed = await Swal.fire({
                icon: 'question',
                text: 'Are you sure you want to Do this?',
                showCancelButton: true,
                confirmButtonText: 'Yes!',
                cancelButtonText: 'No, cancel',
              });
        
              if (confirmed.value === true) {
            const response = await axios.get(`/api/admin/blockclient/${id}`);
           getClients()
        } 
    }catch (error) {
            
        }
    }


    const columns = [
        {
            name: "name",
            selector: row => row.name
        },
        {
            name: "age",
            selector: row => row.age
        },
        {
            name: "gender",
            selector: row => row.gender
        },
        {
            name: "address",
            selector: row => row.address

        },
        {
            name: "Email",
            selector: row => row.email
        },
        {
            name: "mobile",
            selector: row => row.mobile
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
        getClients();
    }, []);

    return (
        <>
        <div>
            <AdminTopbar/>
        </div>
            <div className='flex gap-12'>
                <div>
                    <AdminNavbar />
                </div>
                <div className='d-flex w-full flex-column align-items-center mr-12 mt-10'>
                {isLoading ? (
 <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto' }}>
  <ClipLoader css="display: block; margin: 0 auto; border-color: red;" size={200} color={"teal-900"} loading={true} />
  </div>
) : (
                    <BaseTable
                        columns={columns}
                        data={client}
                        title={"Clients"}
                    />
                    )}

                </div>
            </div>
        </>
    )
}

export default ClientView