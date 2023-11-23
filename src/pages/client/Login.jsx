import React, { useState } from "react";
import Footer from "../../components/Footer";
import Nav from "../../components/nav";

import {ToastContainer, toast} from "react-toastify"
import { NavLink, useNavigate } from "react-router-dom";
import {useLogin} from "../../hooks/client/useLogin"
import 'react-toastify/dist/ReactToastify.css';
import { useAuthContext } from "../../hooks/admin/useAuthContext";
import clientLoginValidation from "../../Validation/client/clientLoginValidation"




export default function Login() {
   
    



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
    const [mobile, setMobile] = useState("");
    
    const [password, setPassword] = useState("");
    const {login}=useLogin()

 
   

    const clientLogin = async (e) => {
        try {
        e.preventDefault();
        const formData = new FormData();
        formData.append('mobile', mobile);
        formData.append('password', password);
         const data = Object.fromEntries(formData.entries());
clientLoginValidation.validate(data)
.then(async () =>{
   
        
    
   const response= await login(mobile,password)
   


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

}catch (error) {
    toast.error("Please enter valid Credentials"
        
      );
  }
      
        

    };

    return (
        <>
            <Nav />

            <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
                <div className="hidden sm:block">
                    <img
                        className="w-full h-full object-cover"
                        src="https://res.cloudinary.com/dqzhitag2/image/upload/v1679461001/Main%20Project/user%20credentials/sign_up_hamog0.jpg"
                        alt=""
                    />
                </div>

                <div className="bg-gray-800 flex flex-col justify-center">
                    <form className="max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8">
                        <h2 className="text-4xl dark:text-white font-bold text-center">
                           LOGIN
                        </h2>
                      
                       
                        <div className="flex flex-col text-gray-400 py-2">
                            <label>Mobile</label>
                            <input
                                className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                                type="string"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col text-gray-400 py-2">
                            <label>Password</label>
                            <input
                                className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                                type="string"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                      
                        <div className="flex justify-between text-gray-400 py-2">
                            <p>
                                New to here?  <NavLink to="/signup" className="font-bold">Sign Up</NavLink>
                            </p>
                        </div>
                        <button
                            type="submit"
                            className="w-full my-5 py-2 bg-teal-500 shadow-lg  hover:shadow-teal-500/40 text-white font-semibold rounded-lg"
                            onClick={clientLogin}
                        >
                            SIGN IN
                        </button>
                        <ToastContainer {...toastConfig} />
                    </form>
                   
                </div>
            </div>
            <Footer />
        </>
    );


}
