




import React from "react";

import { useState } from "react";

import AdminNavbar from "../../components/Sidebar";
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import AdminTopbar from "../../components/AdminTopbar";

import addDepartmentValidation from "../../Validation/admin/addDepartmentValidation";
import axios from "../../instance/axios"
import { useAuthContext } from "../../hooks/admin/useAuthContext";



const AddDepartment = () => {
    const Navigate=useNavigate()
    const {admin}=useAuthContext()
    const[department,setDepartment]=useState('')
    const[image,setImage] =useState('')

    
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

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const formData = new FormData();
        formData.append('department', department);
        formData.append('image', image);
        const data = Object.fromEntries(formData.entries());

        addDepartmentValidation.validate(data)
        .then(async (validatedData) =>{
            const response = await axios.post('/api/admin/addDepartment',validatedData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `${admin.token}`
                  },
            });

       
           
            if (response.data.message) {
              Navigate("/admin/departmentView");
            } else {
              toast(`${response.data.err}`);
            }
        })
        .catch((validationErrors) => {
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
         
        };
    return (
        <>
        <div>
            <AdminTopbar/>
        </div>
            <div className='flex gap-24'>
                <div>

                    <AdminNavbar />
                </div>
                <div className='py-2 w-full h-screen '>
    <section className=" py-1 bg-blueGray-50 ">
        <div className="w-full lg:w-full px-4 mx-auto mt-6 h-screen">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="relative flex  flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-l-emerald-900 h-1/2">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-center">
                        <h6 className="text-blueGray-700 text-xl font-bold">
                            ADD DEPARTMENT
                        </h6>
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10  justify-center items-center">
                    <div className="flex flex-wrap">
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                    Department
                                </label>
                                <input type="text" id="department" name="department" value={department} onChange={(e) => setDepartment(e.target.value)} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                            </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="image-upload">
                                    Upload Image
                                </label>
                                <input type="file" id="image" name="image" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                            </div>
                        </div>
                    </div>
                   
                </div>
            </div>
            <div className="button flex justify-center">
            <button className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="submit">
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
    );
};

export default AddDepartment;









