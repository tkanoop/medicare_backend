import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from '../instance/axios';
import { useAuthContext } from '../hooks/admin/useAuthContext';
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

import Swal from 'sweetalert2';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';



const TimeSlotBookingPage = ({ id, departmentid,title,image,content,departmentId,time,speciality }) => {
  const { client } = useAuthContext()
  console.log(client);
  console.log(departmentid)

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [doctor, setDoctor] = useState([])
  const [amount,setAmount] = useState(1)
  const [modal,setModal] = useState(false)
  const [timeslots,setTimeslots] = useState([])
  const [bookedtimes,setBookedtimes] = useState([null])
  const [commonSlots, setCommonSlots] = useState([]);
  


  const toastConfig = {
    position: "top-center",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    toastClassName: "toast-container",
    bodyClassName: "toast-body",
    closeButton: false,
    theme: "dark",
  };


 

  const getdoctor = async () => {
    console.log("gfhdhf");
    const response = await axios.post(`/api/client/getdoctor/${id}`, 
    {
      date: selectedDate.toLocaleDateString('en-GB'),
      time: time,
    },
    
    {

      headers: {
        Authorization: ` ${client.token}`,
      },

    })
    console.log(response.data);
    
    setTimeslots(response.data.timeslots)

  }
 

  useEffect(() => {


    getdoctor()
  }, [selectedDate])

useEffect(() =>{
 getTime()

},[selectedDate])

useEffect(() => {
  // Update common slots whenever either bookedtimes or timeslots change
  
  const common = bookedtimes.filter(time => timeslots.includes(time));
  setCommonSlots(common);

}, [bookedtimes, timeslots]);


const getTime =async (time) =>{
  const response = await axios.post(
    `/api/client/bookingtime/${id}/${departmentid}`,
    {
      date: selectedDate.toLocaleDateString('en-GB'),
      time: time,
    },
    {
      headers: {
        Authorization: ` ${client.token}`,
      },
    }
  );
  const {message,bookedTimes}=response.data
  setBookedtimes(bookedTimes)


}




 


  const handleSelectTime = async (time) => {
    setSelectedTime(time);

    try {
      const confirmed = await Swal.fire({
        icon: 'question',
        text: 'Are you sure you want to book this time?',
        showCancelButton: true,
        confirmButtonText: 'Yes, book it!',
        cancelButtonText: 'No, cancel',
      });

      if (confirmed.value === true) {
        const response = await axios.post(
          `/api/client/bookings/${id}/${departmentid}`,
          {
            date: selectedDate.toLocaleDateString('en-GB'),
            time: time,
          },
          {
            headers: {
              Authorization: ` ${client.token}`,
            },
          }
        );

        if (response.data.message) {
          toast(`${response.data.message}`);
        } else if (response.data.success) {
         setModal(!modal)
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePaymentSuccess =async (time)=>{
    
    const response = await axios.post(
      `/api/client/postbookings/${id}/${departmentid}`,
      {
        date: selectedDate.toLocaleDateString('en-GB'),
        time: time,
      },
      {
        headers: {
          Authorization: ` ${client.token}`,
        },
      }
    );

    if (response.data.success) {
      setModal(!modal)
      toast(`${response.data.success}`);
    }
    

  }








  return (

    <>
    <div className="sm:h-[700px]  flex justify-center  ">
      <img className="h-[250px] w-full  md:mt-0 md:h-[600px]  " src="https://res.cloudinary.com/dqzhitag2/image/upload/v1682423134/Main%20Project/depart_ojnl54.jpg" alt="" />
    </div>
    <h1 class="text-4xl font-bold text-center text-gray-700  rounded-lg py-2 px-4">
  BOOK HERE
</h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      

      <div className="hidden sm:block">
        <div className=" rounded-lg bg-gray-200 p-8 mx-2 text-center mt-8 ">

          <img src={image} alt="Card Image" className="rounded-full mx-auto " style={{ height: "200px", width: "200px", borderRadius: "50%" }} />
          <h3 className="text-xl font-semibold  mt-4 ">NAME:  {title}</h3>
          <p className="text-gray-900 font-medium mt-3">DEPARTMENT:  {content}</p>
          <h3 className=" font-medium mt-3">
           SPECIALITY:  {speciality}
          </h3>
          <h3 className=" font-medium mt-3">
           FEE:  1 $
          </h3>
        </div>


      </div>
      <div className="flex flex-col items-center justify-center h-screen -mt-36">
        <h1 className="text-2xl font-bold mb-4">Select a date and time</h1>
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-4">
            <label htmlFor="datepicker" className="font-semibold">Date:</label>
            <DatePicker
              id="datepicker"
              selected={selectedDate}
              onChange={date => setSelectedDate(date)}
              dateFormat="MMMM d, yyyy"
              className="p-2 border rounded"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            
          {timeslots.map(time => (
          <button
            key={time}
            className={`py-2 px-4 rounded-lg border-2 border-gray-400 ${
              commonSlots.includes(time) ? 'bg-red-600 cursor-not-allowed' : 'hover:bg-gray-200'
            }`}
            onClick={() => handleSelectTime(time)}
            disabled={commonSlots.includes(time)}
          >
            {time}
          </button>
        ))}


             
            </div>
          {modal && (
      <div className="fixed z-20 inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-white p-2 rounded w-96 m-5">
          <div className="flex justify-between">
            <h1 className="font-semibold text-center text-2xl px-5 my-5 text-gray-700">
              {"Details"}
            </h1>
            <button
              className="font-semibold mr-3 mb-8 text-xl"
              onClick={() => setModal(!modal)}
            >
              X
            </button>
          </div>
          <div className="flex flex-col  p-5">
          <PayPalScriptProvider options={{"client-id":"AVCLuVXUzeU4TpT8irx-CHAJ5-O9bEy1ceprR1nwydKZ2j02P-_80zM_3Re6W3ydi1sPM-iHpDfGUNrP"}}>
                            <PayPalButtons
                            createOrder={(data,actions)=>{return actions.order.create({purchase_units:[{amount:{value:amount.toString()}}]})}}
                            onApprove={async (data,actions)=>{
                              await actions.order.capture()
                              handlePaymentSuccess(selectedTime)
                              
                              console.log(amount);
                            }}
                            onCancel={()=>{toast.error('Payment cancelled')}}
                            
                            onError={()=>{toast.error('Payment failed') }}/>
                           
                            {console.log(amount)}
                        </PayPalScriptProvider>
      

           
          </div>
        </div>
      </div>
    )}
       
     


        </div>
      </div>
      <ToastContainer {...toastConfig} />
     


    </div>
    </>

  );
};

export default TimeSlotBookingPage;
