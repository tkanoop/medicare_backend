import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Nav from "../../components/nav";
import axios from "../../instance/axios";
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


export default function Signup() {
    const navigate = useNavigate();
    const [value, setValue] = useState({
        name: "",
        age: "",
        gender: "",
        email: "",
        address: "",
        mobile: "",
        password: ""

    });
    const toastConfig={
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        toastClassName:"toast-container",
        bodyClassName:"toast-body",
        theme: "dark",
    }

    const addClient = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(
                "/api/client/addClient",
                {
                    ...value

                }
            ).then((data) => {

                console.log(data.data);
                toast(`${data.data}`)
                
                navigate('/verify', { state: value })
            })
        } catch (error) {
            toast.error(`${error.response.data.message}`)
            console.log(error.response.data.message);
        }
    };

    return (
        <>
            <Nav />

            <div className="grid grid-cols-1 sm:grid-cols-2 h-auto w-full">
                <div className="hidden sm:block">
                    <img
                        className="w-full h-full object-cover"
                        src="https://res.cloudinary.com/dqzhitag2/image/upload/v1679461001/Main%20Project/user%20credentials/sign_up_hamog0.jpg"
                        alt=""
                    />
                </div>

                <div className="bg-gray-800 flex flex-col justify-center py-4">
                    <form className="max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8">
                        <h2 className="text-4xl dark:text-white font-bold text-center">
                            REGISTRATION
                        </h2>
                        <div className="flex flex-col text-gray-400 py-2">
                            <label>Name</label>
                            <input
                                className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                                type="text"
                                name="name"
                                onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col text-gray-400 py-2">
                            <label>Age</label>
                            <input
                                className="p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                                type="number"
                                name="age"
                                onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col text-gray-400 py-2">
                            <label>Gender</label>
                            <div className="flex">
                                <label className="mx-2">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })}
                                    />
                                    Male
                                </label>
                                <label className="mx-2">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })}
                                    />
                                    Female
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-col text-gray-400 py-2">
                            <label>Email</label>
                            <input
                                className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                                type="email"
                                name="email"
                                onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col text-gray-400 py-2">
                            <label>Address</label>
                            <input
                                className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                                type="text"
                                name="address"
                                onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col text-gray-400 py-2">
                            <label>Mobile</label>
                            <input
                                className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                                type="string"
                                name="mobile"
                                onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col text-gray-400 py-2">
                            <label>Password</label>
                            <input
                                className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                                type="string"
                                name="password"
                                onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })}
                            />
                        </div>

                        <div className="flex justify-between text-gray-400 py-2">
                            <p>
                                Already A Member ? <span className="font-bold ">Sign In</span>
                            </p>
                        </div>
                        <button
                            type="submit"
                            className="w-full my-5 py-2 bg-teal-500 shadow-lg  hover:shadow-teal-500/40 text-white font-semibold rounded-lg"
                            onClick={addClient}
                        >
                            SIGN UP
                        </button>
                    </form>
                    <ToastContainer {...toastConfig} />
                </div>
            </div>
            <Footer />
        </>
    );
}
