import React from 'react';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/admin/useAuthContext';
import axios from "../instance/axios"
import Swal from 'sweetalert2';
const ClientProfile = () => {
  const { client } = useAuthContext()
  const [user, setUser] = useState([])
  const [booking, setBooking] = useState([])
  const [viewmodal, setViewmodal] = useState(false)
  const [prescription, setPrescription] = useState('')



  const fetchUser = async () => {
    try {


      const response = await axios.get('/api/client/getUser', {
        headers: {
          'Authorization': `${client.token}`
        }
      })

      setUser(response.data)
    } catch (error) {

    }

  }

  const fetchBooking = async () => {
    try {
      const response = await axios.get('/api/client/getBooking', {
        headers: {
          'Authorization': `${client.token}`
        }
      })
      setBooking(response.data)



    } catch (error) {

    }

  }
  const handleEdit = async (id, booking) => {
    try {
      const confirmed = await Swal.fire({
        icon: 'question',
        text: 'Are you sure you want to cancel this booking?',
        showCancelButton: true,
        confirmButtonText: 'Yes!',
        cancelButtonText: 'No, cancel',
      });

      if (confirmed.value === true) {
         

        const response = await axios.post(`/api/client/cancelBooking/${id}`, {
          time: booking.starting_time,
          date: booking.date
        });
        

        const { success, message } = response.data
        if (success) {
          fetchBooking()
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Cancellation Error',
            text: message,
          });
        }
      
          
       
        
      }
    } catch (error) {

    }
  };





  const viewPrescription = async (id) => {
    setViewmodal(!viewmodal)
    try {
      const response = await axios.get(`/api/client/getPrescription/${id}`, {
        headers: {
          Authorization: `${client.token}`,
        },
      });
      setPrescription(response.data)

    } catch (error) {

    }

  }
  useEffect(() => {
    fetchUser()
  }, [])
  useEffect(() => {
    fetchBooking()
  }, [])

  return (
    <>
      <div className="sm:h-[600px] flex justify-center">
        <img className="h-[400px] w-full md:mt-0 md:h-[600px]" src="https://res.cloudinary.com/dqzhitag2/image/upload/v1680431987/Main%20Project/wallpaperflare.com_wallpaper_c5jwwm.jpg" alt="" />
      </div>
      <div className="max-w-[1300px] mx-auto py-8 px-4 sm:px-6 lg:py-12 lg:px-8">
        <section className="mb-8">
          <h1 className="font-extrabold text-3xl text-center text-gray-800">PROFILE</h1>
          <div className="bg-white shadow-md rounded-md p-6 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h2 className="text-lg font-bold mb-2 text-gray-800">Your Details</h2>
                <p className="text-gray-600">Name: {user.name}</p>
                <p className="text-gray-600">Age: {user.age}</p>
                <p className="text-gray-600">Email: {user.email}</p>
                <p className="text-gray-600">Phone: {user.mobile}</p>
                <p className="text-gray-600">Address: {user.address}</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">BOOKING DETAILS</h2>
          <div className="bg-white shadow-md rounded-md p-6">
            <table className="min-w-full mt-8">
              <thead>
                <tr>
                  <th className="text-center py-2">Doctor Name</th>
                  <th className="text-center py-2">Date</th>
                  <th className="text-center py-2">Time</th>
                  <th className="text-center py-2">Action</th>
                  <th className="text-center py-2">Prescription</th>
                </tr>
              </thead>
              <tbody>
                {booking.map((bookingItem, index) => (
                  <tr key={index}>
                    <td className="text-center py-2">{bookingItem.doctor_id}</td>
                    <td className="text-center py-2">{bookingItem.date}</td>
                    <td className="text-center py-2">{bookingItem.starting_time}</td>
                    <td className="text-center py-2">
                      <button onClick={() => handleEdit(bookingItem._id, bookingItem)} className={`${bookingItem.status ? "bg-green-700" : "bg-red-700"} text-white px-4 py-2 rounded-md w-[120px]`}>
                        {bookingItem.status ? "Cancel" : "Cancelled"}
                      </button>
                    </td>
                    <td className="text-center py-2">
                      <button
                        className="bg-green-500 shadow-md  hover:bg-green-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={() => viewPrescription(bookingItem._id)}

                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        {viewmodal && (
        <div className="fixed z-20 inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg w-3/4">
          <div className="flex justify-between">
            <h1 className="font-semibold text-center text-3xl px-5 my-5 text-gray-700">
              {"Details"}
            </h1>
            <button
              className="font-semibold mr-3 mb-8 text-2xl"
              onClick={() => setViewmodal(!viewmodal)}
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
                    Disease One
                  </label>
                  <input
                    type="text"
                    id="disease"
                    className="mt-1 bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5"
                   
                    value={prescription.diseaseone}
                    placeholder='Disease'
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block font-normal " htmlFor="name">
                    Disease Two
                  </label>
                  <input
                    type="text"
                    id="disease"
                    className="mt-1 bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5"
                    
                    value={prescription.diseasetwo}
                    placeholder='Disease'
                  />
                </div>
                <div className="w-full md:w-1/3 px-3">
                  <label className="block font-normal " htmlFor="Medicine">
                    Medicine One
                  </label>
                  <input
                    type="text"
                    id="medicine"
                    className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5"
                  
                    value={prescription.medicineone}

                  />
                </div>
                <div className="w-full md:w-1/3 px-3">
                  <label className="block font-normal " htmlFor="Medicine">
                    Days
                  </label>
                  <input
                    type="text"
                    id="medicine"
                    className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5"
                 
                    value={prescription.firsttimes}

                  />
                </div> <div className="w-full md:w-1/3 px-3">
                  <label className="block font-normal " htmlFor="Medicine">
                    Times
                  </label>
                  <input
                    type="text"
                    id="medicine"
                    className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5"
                 
                    value={prescription.firstdays}

                  />
                </div>
                <div className="w-full md:w-1/3 px-3">
                  <label className="block font-normal " htmlFor="Medicine">
                    Medicine Two
                  </label>
                  <input
                    type="text"
                    id="medicine"
                    className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5"
                  
                    value={prescription.medicinetwo}

                  />
                </div>
                <div className="w-full md:w-1/3 px-3">
                  <label className="block font-normal " htmlFor="Medicine">
                    Days
                  </label>
                  <input
                    type="text"
                    id="medicine"
                    className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5"
                 
                    value={prescription.seconddays}

                  />
                </div> <div className="w-full md:w-1/3 px-3">
                  <label className="block font-normal " htmlFor="Medicine">
                    Times
                  </label>
                  <input
                    type="text"
                    id="medicine"
                    className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5"
                    
                    value={prescription.secondtimes}

                  />
                </div>
              </div>


             
            </form>
          </div>
        </div>
      </div>
        )}

      </div>
    </>



  );
};

export default ClientProfile;
