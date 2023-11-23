// import "./Verify.css";
import React, { useState } from "react";
import OTPInput from 'react18-input-otp';
import axios from "../../instance/axios"
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

import Nav from "../../components/nav";
import Footer from "../../components/Footer";

export default function Verify() {
    const navigate = useNavigate()
    const [OTP, setOTP] = useState("");
    const Location = useLocation();
    const data = Location.state;
    const toastConfig = {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        toastClassName: "toast-container",
        bodyClassName: "toast-body",
        closeButton: true,
        closeButton: <span className="toast-close-button"></span>,
        theme: "dark",
    }




    function handleChange(OTP) {
        setOTP(OTP);

    }
    const submit = async (e) => {
        e.preventDefault();
        try {
            const { datas } = await axios.post(
                "/api/client/submit",
                {
                    OTP,
                    data

                }
            ).then(() => {
                navigate('/login')

            })

        } catch (error) {
            toast.error(`${error.response.data.message}`)
            console.log(error.response.data.message);

        }

    }



    return (
        <>
            <Nav />
            <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
                <div className="hidden sm:block">
                    <img
                        className="w-full h-full object-cover"
                        src="https://res.cloudinary.com/dqzhitag2/image/upload/v1679637377/Main%20Project/Health-Insurance_pmvllw.jpg"
                        alt=""
                    />
                </div>
                <div
                    className="bg-gray-800 flex flex-col justify-center"
                    style={{
                        padding: "18px",
                    }}
                >
                    <p
                        className="p1"
                        style={{
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: 800,
                            marginTop: "25px",
                            marginLeft: "50px",
                            fontSize: "27px",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        Verify Account
                    </p>
                    <p
                        className="p2"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "13px",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        An OTP has been sent to your entered mobile number
                    </p>
                    <div
                        className="otpElements"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "baseline",
                            marginTop: "20px",
                            marginBottom: "50px",
                            paddingLeft: "18px",
                            justifyContent: "center",
                        }}
                    >
                        <p
                            className="p3"
                            style={{
                                fontSize: "14px",
                            }}
                        >
                            Enter your Code here
                        </p>
                        <div
                            className="otp"
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "20px",
                                width: "100%",
                            }}
                        >
                            <OTPInput
                                onChange={handleChange}
                                value={OTP}
                                inputStyle={{
                                    width: "50%",
                                    height: "45px",
                                    borderRadius: "7px",
                                    border: "0px",
                                    marginLeft: "8px",
                                    marginRight: "8px",
                                    background: "#dddddd",
                                    fontSize: "20px",
                                }}
                                numInputs={6}
                                separator={<span></span>}
                            />
                        </div>
                    </div>
                    <div
                        className="sub"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <button
                            className="but"
                            style={{
                                color: "#dddddd",
                                fontSize: "20px",
                                fontWeight: 600,
                                width: "190px",
                                height: "53px",
                                border: "0px",
                                background: "teal-900",
                               
                                borderRadius: "32px",
                                cursor: "pointer",
                            }}
                            onClick={submit}
                            type="submit"
                        >
                            VERIFY
                        </button>
                    </div>
                </div>
            

            <ToastContainer {...toastConfig} />
        </div >

            <Footer />



        </>
    )
}

