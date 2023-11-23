import React, { useEffect, useState } from 'react'
import axios from '../../instance/axios'
import AdminNavbar from '../../components/Sidebar'
import { useNavigate } from 'react-router-dom'

import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import AdminTopbar from '../../components/AdminTopbar'
import addDoctorValidation from '../../Validation/admin/addDoctorValidation'
import { useAuthContext } from '../../hooks/admin/useAuthContext'
const AddDoctor = () => {
    const {admin}=useAuthContext()
    const [data, setData] = useState([])
    const Navigate=useNavigate()

    const [department, setDepartment] = useState("")
    const [name, setName] = useState("")
    const [speciality, setSpeciality] = useState("")
    const [mobile, setMobile] = useState("")
    const [email, setEmail] = useState("")
    const [hospital, setHospital] = useState("")
    const [language, setLanguage] = useState("")
    const [image, setImage] = useState("")

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


    const fetchData = async () => {
        try {
            const response = await axios.get('/api/admin/getDepartments'); // Make a GET request to the '/departments' API endpoint
            const departments = response.data; // Extract the departments data from the response
            setData(departments)
            console.log(departments); // Log the departments data to the console
        } catch (err) {
            console.error(err.message);
        }
    };
    useEffect(() => {
        fetchData()

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('department',department);
        formData.append('name',name)
        formData.append('speciality',speciality)
        formData.append('email',email)
        formData.append('mobile',mobile)
        formData.append('hospital',hospital)
        formData.append('language',language)
        formData.append('image',image);

        const data = Object.fromEntries(formData.entries());
        addDoctorValidation.validate(data).then(async(validatedData)=>{
            const response = await axios.post('/api/admin/addDoctor',validatedData,{
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': `${admin.token}`
                },
                
              })

            if(response.data.message){
               Navigate("/admin/doctorView")
            }
        }).catch((validationErrors) => {
            toast.error(validationErrors.message, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          });   
       

    
   
        
   
    }


    return (
        <>
        <div>
            <AdminTopbar/>
        </div>
            <div className='flex gap-24'>
                <div>

                    <AdminNavbar />
                </div>
                <div className='py-2'>
                    <section className=" py-1 bg-blueGray-50 ">
                        <div className="w-full lg:w-full px-4 mx-auto mt-6">
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-l-emerald-900">
                                    <div className="rounded-t bg-white mb-0 px-6 py-6">
                                        <div className="text-center flex justify-center">
                                            <h6 className="text-blueGray-700 text-xl font-bold">
                                                ADD DOCTOR
                                            </h6>

                                        </div>
                                    </div>
                                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">


                                        <div className="flex flex-wrap">
                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                                        Name
                                                    </label>
                                                    <input type="text" name="name" onChange={(e) => setName(e.target.value)} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="department">
                                                        Department
                                                    </label>
                                                    <select name="department" id="department" onChange={(e) => setDepartment(e.target.value)} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                                                        <option value="">Select Department</option>

                                                        {data.map((option) => (
                                                            <option key={option} value={option.department}>
                                                                {option.department}
                                                            </option>
                                                        ))}

                                                    </select>
                                                </div>
                                            </div>


                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                                        Speciality
                                                    </label>
                                                    <input type="text" name="speciality" onChange={(e) => setSpeciality(e.target.value)} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                                        Mobile
                                                    </label>
                                                    <input type="text" name="mobile" onChange={(e) => setMobile(e.target.value)} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                                        Email
                                                    </label>
                                                    <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                                        Hospital
                                                    </label>
                                                    <input type="text" name="hospital" onChange={(e) => setHospital(e.target.value)} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                                        Languages
                                                    </label>
                                                    <input type="text" name="language" onChange={(e) => setLanguage(e.target.value)} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="image-upload">
                                                        Upload Image
                                                    </label>
                                                    <input type="file" id="image" name="image" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                                </div>
                                            </div>
                                        </div>





                                        <hr className="mt-6 border-b-1 border-blueGray-300" />


                                    </div>
                                </div>
                                <div className="button flex justify-center">
                                    <button className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="submit" >
                                        Save
                                    </button>
                                </div>
                                <ToastContainer {...toastConfig} />
                            </form>

                        </div>
                    </section>
                </div>
            </div>
        </>

    )
}

export default AddDoctor