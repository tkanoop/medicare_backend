
import BaseTable from '../../components/baseTable'
import React, { useEffect, useState } from 'react'

import axios from "../../instance/axios"

import { ClipLoader } from 'react-spinners'
import Swal from 'sweetalert2';
import DoctorTopbar from '../../components/DoctorTopbar';
import DocSideBar from '../../components/Docsidebar';
import { useAuthContext } from '../../hooks/admin/useAuthContext';


const BookingView = () => {
    const [booking, setBooking] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { doctor } = useAuthContext()
    const getBooking = async () => {
        try {
            const response = await axios.get("/api/doctor/getAllBookings", {
                headers: {
                  Authorization: `${doctor.token}`,
                },
              });

            setBooking(response.data)



        } catch (error) {

        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = async (id,booking) => {
        try {
             const confirmed = await Swal.fire({
                icon: 'question',
                text: 'Are you sure you want to Cancel This Booking?',
                showCancelButton: true,
                confirmButtonText: 'Yes!',
                cancelButtonText: 'No, cancel',
              });
        
            if (confirmed.value === true) {
       const date=booking.date
      
        const currentTime = new Date();
        
        const currentTimeSlot = `${currentTime.getHours()}:00 ${currentTime.getHours() >= 12 ? 'PM' : 'AM'}`;
        const dates=new Date(date)
        const selectedDateStr = dates.toLocaleDateString();
    
        const selectedDateTime = new Date(`${selectedDateStr} ${booking.starting_time}`);
             
               if (
                selectedDateTime > new Date() ||
                (selectedDateTime.toLocaleTimeString() === currentTimeSlot && selectedDateTime >= new Date())
              ) {
            const response = await axios.get(`/api/doctor/cancelbooking/${id}`);
           getBooking()
        } else {
            // Show an error message or perform alternative action
            Swal.fire({
                icon: 'error',
                text: 'Cannot cancel a booking with a past starting time.',
            });
        }
        }
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
            name: "Action",
            cell: (row) => (
                <>
               
                <button onClick={()=>handleEdit(row._id,row)} className={`${row.status?"bg-green-700" : "bg-red-700"} px-2 py-1 text-white rounded-md w-[120px]`}
>
                    {row.status ? "Cancel":"Cancelled"}

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
                <DoctorTopbar/>
            </div>
            <div className='flex gap-24'>
                <div>
                  <DocSideBar/>
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
                            title={"TOTAL BOOKINGS"}
                        />
                    )}

                </div>
            </div>
        </>
    )
}

export default BookingView