import React, { useState } from 'react';

import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useLogin } from '../../hooks/doctor/useLogin';
import doctorLoginValidation from '../../Validation/doctor/doctorLoginValidation';



export default function DocLogin() {
  const { login } = useLogin()
 
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("")

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


  const doctorLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
     const data = Object.fromEntries(formData.entries());
doctorLoginValidation.validate(data)
.then(async () =>{
await login(email, password)
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

      <div className="min-h-screen bg-cover bg-center flex flex-col md:flex-row">
        <div className="md:w-1/2 h-64 md:h-auto relative">
          <div className="absolute w-full h-full bg-gradient-to-t from-gray-900 to-transparent opacity-75"></div>
          <img
            className="absolute w-full h-full object-cover"
            src="https://res.cloudinary.com/dqzhitag2/image/upload/v1679064651/Main%20Project/hosuserside_chuwmd.jpg"
            alt="Background"
          />
          <div className="absolute w-full h-full flex items-center justify-center">

            <h1 className="text-black text-4xl font-bold">Welcome</h1>
          </div>
        </div>
        <div className="md:w-1/2 flex flex-col items-center justify-center p-8 bg-teal-800">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form className="w-full max-w-md "  onSubmit={doctorLogin} encType="multipart/form-data">
            <div className="mb-4">
              <label className="block text-black font-bold mb-2" htmlFor="username">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="email"
                id='email'
                
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-black font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                name="password"
                id='password'
                type="text"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit"
              
              >
                Sign In
              </button>
            </div>
            <ToastContainer {...toastConfig} />
          </form>
        </div>
      </div>
    </>
  );
}

