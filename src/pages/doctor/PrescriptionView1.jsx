
import BaseTable from '../../components/baseTable'
import React, { useEffect, useState } from 'react'

import axios from "../../instance/axios"

import { ClipLoader } from 'react-spinners'

import DoctorTopbar from '../../components/DoctorTopbar'
import DocSideBar from '../../components/Docsidebar'
import { useAuthContext } from '../../hooks/admin/useAuthContext';


const PrescriptionViews = () => {
  const [modal, setModal] = useState(false)
  const [viewmodal, setViewModal] = useState(false)
  const [booking, setBooking] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [docName, setDocName] = useState("");
  const [clientName, setClientName] = useState("");
  const [date, setDate] = useState("")
  const [diseaseone,setDiseaseone]=useState("")
  const [diseasetwo,setDiseasetwo]=useState("")
  const [medicineone, setMedicineone] = useState("");
  const [medicinetwo, setMedicinetwo] = useState("");
  const [firsttimes, setFirsttimes] = useState("");
  const [firstdays, setFirstdays] = useState("");
  
  const [secondtimes, setSecondtimes] = useState("");
  const [seconddays, setSeconddays] = useState("");
  
  const [bookid, setBookid] = useState("")
  const [id,setId]=useState("")

  const [time, setTime] = useState("");
  const [prescription,setPrescription] = useState("")
  const { doctor } = useAuthContext()
  const [fieldSets, setFieldSets] = useState([]);





  const getBooking = async () => {
    console.log(doctor.token);
    try {
      const response = await axios.get("/api/doctor/getBookings", {
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

  const handlePrescription = async (id) => {
    setModal(!modal)
    try {
      const response = await axios.get(`/api/doctor/getSingleBooking/${id}`, {
        headers: {
          Authorization: `${doctor.token}`,
        },       
      });
      setDocName(response.data.doctor_id)
      setClientName(response.data.client_id)
      setDate(response.data.date)
      setTime(response.data.starting_time)
      setBookid(id)
    } catch (error) {
      console.log("errrorr");
    }
  }

  const viewPrescription = async (id) => {
setId(id)
    setViewModal(!viewmodal)
  }

  const prescriptionDetails = async() =>{
    try {
        const response = await axios.get(`/api/doctor/getPrescription/${id}`, {
          headers: {
            Authorization: `${doctor.token}`,
          },       
        });
        setPrescription(response.data)
        
      } catch (error) {
        
      }

  }

    

 


  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await axios.post(
      `/api/doctor/prescription`,
      {
        docName,
        clientName,
        time,
        date,
        diseaseone,
        diseasetwo,
        medicineone,
        medicinetwo,
        firsttimes,
        firstdays,
        secondtimes,
        seconddays,

        bookid

      },

      {
        headers: {
          Authorization: ` ${doctor.token}`,
        },
      }
    )
    if(response.data.message){
      setModal(!modal)
    }
    console.log(docName);
    console.log(clientName);
    console.log(time);
    console.log(bookid);
    console.log(date);
  }




  const columns = [
    {
        name: "Client Name",
        selector: (row) => {
          setId(row.client_id); // Update clientId state with the row.client_id
          return row.client_id;
        }
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
        name: "Actions",
        cell: (row) => (
          <>
            {prescription ? (
              <button
                className="bg-green-500 shadow-md hover:bg-green-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => viewPrescription(row._id)}
              >
                View
              </button>
            ) : (
              <button
                className="bg-green-500 shadow-md hover:bg-green-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => handlePrescription(row._id)}
              >
                Add
              </button>
            )}
          </>
        )
      }
      

  ];
  
  useEffect(() => {
    getBooking();
    prescriptionDetails()
    
  }, []);


  return (
    <>
      <div>
        <DoctorTopbar />
      </div>
      <div className='flex gap-24'>
        <div>
          <DocSideBar />
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
              title={"PRESCRIPTIONS"}
            />
          )}

          {modal && (
            <div className="fixed z-20 inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg w-3/4">
                <div className="flex justify-between">
                  <h1 className="font-semibold text-center text-3xl px-5 my-5 text-gray-700">
                    {"Details"}
                  </h1>
                  <button
                    className="font-semibold mr-3 mb-8 text-2xl"
                    onClick={() => setModal(!modal)}
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
                          value={docName}
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
                          value={clientName}
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
                          value={date}
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
                          value={time}

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
                         
                          onChange={(e) => setDiseaseone(e.target.value)}
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
                          
                          onChange={(e) => setDiseasetwo(e.target.value)}
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
                        
                          onChange={(e) => setMedicineone(e.target.value)}

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
                       
                          onChange={(e) => setFirstdays(e.target.value)}

                        />
                      </div> <div className="w-full md:w-1/3 px-3">
                        <label className="block font-normal " htmlFor="Medicine">
                          Times
                        </label>
                        <input
                          type="text"
                          id="medicine"
                          className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5"
                       
                          onChange={(e) => setFirsttimes(e.target.value)}

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
                        
                          onChange={(e) => setMedicinetwo(e.target.value)}

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
                       
                          onChange={(e) => setSeconddays(e.target.value)}

                        />
                      </div> <div className="w-full md:w-1/3 px-3">
                        <label className="block font-normal " htmlFor="Medicine">
                          Times
                        </label>
                        <input
                          type="text"
                          id="medicine"
                          className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5"
                          
                          onChange={(e) => setSecondtimes(e.target.value)}

                        />
                      </div>
                    </div>


                    <div className="text-center p-2">
                      <button
                        onClick={handleSubmit}
                        type="button"
                        className=" px-5 py-1 bg-gray-700 text-white text-lg rounded"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
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
      </div>

 
  



      
    </>
  )
}

export default PrescriptionViews;


