import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState,useEffect } from "react";
import axios from'../instance/axios'
import {  useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/admin/useAuthContext";
import { ClipLoader } from 'react-spinners';



const RoundCard = ({ title, content, image,id,departmentId ,time,speciality}) => {

  const navigate = useNavigate();

  const handleClick = () => {
    const state = {
      id,
      title,
      image,
      content,
      departmentId,
      time,
      speciality
    };

    navigate('/doctorbooking', { state });
  };
  return (
    <div className=" rounded-lg bg-white p-8 mx-2 text-center " >
      <img src={image} alt="Card Image" className="rounded-full mx-auto" style={{ height: "200px", width: "200px", borderRadius: "50%" }} />
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-blue-500 mb-4">{content}</p>
    
      
      <button
        onClick={handleClick}
        className="mt-4 text-white text-sm ml-2 uppercase bg-teal-900 p-3"
      >
        Book Now
      </button>
      
    </div>
  );
};

const DepartmentDoctors = ({ id1 }) => {
  const {client} =useAuthContext()
  console.log("mounting");
  const navigate= useNavigate()
  const [doctor, setDoctor] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  

  const getDoctors = async () => {

    try {

      const response = await axios.get(`/api/client/getDoctorsByDepartment/${id1}`,{
        headers:{
          'Authorization': ` ${client.token}`
        }
        })
        const {tokenverified,statusverified,responseData}=response.data
        if(tokenverified&&statusverified){
          setDoctor(responseData);
        }
        else{
          navigate('/login')
        }
    
    } catch (error) {
      console.error(error);
    }finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
   
      getDoctors();
     
    
  }, []);

 

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
     
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
    
    
    
  };

  return (
    <>
      <div className="sm:h-[700px]  flex justify-center  ">
        <img className="h-[400px] w-full  md:mt-0 md:h-[700px]  " src="https://res.cloudinary.com/dqzhitag2/image/upload/v1680431987/Main%20Project/wallpaperflare.com_wallpaper_c5jwwm.jpg" alt="" />
      </div>
      <div className="max-w-[1300px] mx-auto py-8 px-4 sm:px-6 lg:py-12 lg:px-8">
        <h1 className=" font-extrabold text-3xl flex justify-center">OUR DOCTORS</h1>
        {isLoading ? (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
  <ClipLoader css="display: block; margin: 0 auto; border-color: red;" size={200} color={"teal-900"} loading={true} />
</div>
) : (
        <Slider {...settings}>
          {doctor.map((card) => (
            <div key={card.id}>
              <RoundCard
                title={card.name}
                content={card.department}
                image={card.image}
                id={card._id}
                departmentId={id1}
                time={card.timeslots}
                speciality={card.speciality}
              />
            </div>
          ))}
        </Slider>
         )}
      </div>
    </>
  );
};

export default DepartmentDoctors;
