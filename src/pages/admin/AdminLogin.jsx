import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../instance/axios"
import { useLogin } from "../../hooks/admin/useLogin";

function AdminLogin() {
    const navigate=useNavigate()
   


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login}=useLogin()
    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email,password)
      
        // try {
        //      await axios.post('/api/admin/login',
        //     {
        //         email,
        //         password

        //     }
        //     ).then((response)=>{
        //         if(response.data.status){
        //             navigate('/admin')

        //         }else{
        //             console.log("error");
        //         }


        //     })
            
        // } catch (error) {
            
        // }

    }
    return (
        <div className="flex justify-center  h-screen">
            
            <div className="container h-screen md:w-full md:flex md:justify-center flex-col md:flex-row bg-[#a1aeb8] ">
                <div className="h-[300px] w-[300px]  md:mt-[140px]  md:h-[400px] flex justify-center " >
                 <img className="h-[300px] w-full mt-8 md:mt-0 md:h-[400px] rounded " src="https://res.cloudinary.com/dqzhitag2/image/upload/v1679026633/Main%20Project/med_wall_xcwcjj.jpg" alt="" />
                </div>
                <div className="h-[400px] w-[1/2]  bg-[#36454F] md:mt-[140px]  ">
                    <form className="bg-[#36454F] 	w-80 rounded-xl	p-8" onSubmit={handleSubmit}>
                        <h3 className="font-bold text-2xl text-center text-white mb-10 ">
                            Mankind
                        </h3>
                        <div className="block mb-7  ">
                            <label className="mt-2 mb-1 block text-sm font-bold text-gray-700" >Email:</label>
                            <input
                                className="w-full rounded  focus:outline-none p-2 "
                                type="email"
                                value={email}
                                placeholder='Email'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label className="mt-2 mb-1 block text-sm font-bold text-gray-700" >Password:</label>
                            <input
                                className=" w-full rounded  focus:outline-none p-2"
                                type="password"
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="focus:shadow-outline  w-full rounded bg-teal-900 py-2 px-4 font-bold text-white hover:bg-[#074A52] focus:outline-none"
                        >
                            Login
                        </button>
                    </form>
                </div>

            </div>




        </div>
    );
}

export default AdminLogin;
