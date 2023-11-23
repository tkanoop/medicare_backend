
import BaseTable from '../../components/baseTable'
import React, { useEffect, useState } from 'react'

import axios from "../../instance/axios"
import AdminNavbar from '../../components/Sidebar'
import AdminTopbar from '../../components/AdminTopbar'
import { ClipLoader } from 'react-spinners'
import Swal from 'sweetalert2';
import { useAuthContext } from '../../hooks/admin/useAuthContext'


const PrescriptionViewAdmin = () => {
    const {admin} =useAuthContext()
    const [booking, setBooking] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [viewmodal, setViewModal] = useState(false)
    const [prescription,setPrescription] = useState("")
    const getBooking = async () => {
        try {
            const response = await axios.get("/api/admin/getBookings")

            setBooking(response.data)



        } catch (error) {

        } finally {
            setIsLoading(false);
        }
    };

    const viewPrescription = async (id) => {
        setViewModal(!viewmodal)
        try {
          const response = await axios.get(`/api/doctor/getPrescription/${id}`, {
            headers: {
              Authorization: `${admin.token}`,
            },       
          });
          setPrescription(response.data)
          
        } catch (error) {
          
        }
    
      }


    const columns = [
        {
            name: "Client Name",
            selector: row => row.client_id
        },
        {
            name: "Doctor Name",
            selector: row => row.doctor_id
        },
        {
            name: "Department Name",
            selector: row => row.department_id
        },



        {
            name: "Date",
            selector: row => row.date
        },
        {
            name: "Time",
            selector: row => row.starting_time
        },
        
        
        {
            name: "View",
            cell: (row) => (
              <>
      
                <button
                  className="bg-green-500 shadow-md  hover:bg-green-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => viewPrescription(row._id)}
      
                >
                 View
                </button>
              </>
      
            
            )
        },

    ];
    useEffect(() => {
        getBooking();
    }, []);

    return (
        <>
            <div>
                <AdminTopbar />
            </div>
            <div className='flex gap-24'>
                <div>
                    <AdminNavbar />
                </div>
                <div className='d-flex w-full flex-column align-items-center mt-10 mr-24'>
                    {isLoading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto' }}>
                            <ClipLoader css="display: block; margin: 0 auto; border-color: red;" size={200} color={"teal-900"} loading={true} />
                        </div>
                    ) : (




                        <BaseTable
                            columns={columns}
                            data={booking}
                            title={"Prescriptions"}
                        />
                    )}
                    {viewmodal && (
            <div className="fixed z-20 inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg w-3/4">
                <div className="flex justify-between">
                  <h1 className="font-semibold text-center text-3xl px-5 my-5 text-gray-700">
                    {"Details"}
                  </h1>
                  <button
                    className="font-semibold mr-3 mb-8 text-2xl"
                    onClick={() => setViewModal(!viewmodal)}
                  >
                    X
                  </button>
                </div>
                <div className="flex flex-col p-4">
                  <form>
                    <div className="flex flex-wrap">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block font-normal " htmlFor="name">
                          Doctor Name
                        </label>
                        <input
                          type="text"
                          id="first_name"
                          className="mt-1 bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5"
                          value={prescription.doctorName}
                        />
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label className="block font-normal " htmlFor="clientName">
                          Patient Name
                        </label>
                        <input
                          type="name"
                          id="name"
                          className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5"
                          value={prescription.clientName}
                        />

                      </div>
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block font-normal " htmlFor="date">
                          Date
                        </label>
                        <input
                          type="text"
                          id="date"
                          className="mt-1 bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5"
                          value={prescription.date}
                        />
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label className="block font-normal " htmlFor="time">
                          Time
                        </label>
                        <input
                          type="text"
                          id="time"
                          className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5"
                          value={prescription.starting_time}

                        />
                      </div>
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block font-normal " htmlFor="name">
                          Disease
                        </label>
                        <input
                          type="text"
                          id="disease"
                          className="mt-1 bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5"
                          value={prescription.disease}
                         
                          placeholder='Disease'
                        />
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label className="block font-normal " htmlFor="Medicine">
                          Medicine
                        </label>
                        <input
                          type="text"
                          id="medicine"
                          className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5"
                          value={prescription.medicine}
                          

                        />
                      </div>
                    </div>


                   
                  </form>
                </div>
              </div>
            </div>
          )}

                </div>
            </div>
        </>
    )
}

export default PrescriptionViewAdmin;