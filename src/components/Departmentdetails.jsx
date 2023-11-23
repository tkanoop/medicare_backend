import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState,useEffect } from "react";
import axios from'../instance/axios'
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/admin/useAuthContext";
import { ClipLoader } from 'react-spinners';



const RoundCard = ({ department, content, image,id }) => {

  return (
    <div className=" rounded-lg bg-white p-8 mx-2 text-center ">

     <img src={image} alt="Card Image" className="rounded-full mx-auto " style={{ height: "200px", width: "200px", borderRadius: "50%" }} />
      <h3 className="text-xl font-semibold mb-4">{department}</h3>
      <p className="text-gray-900 font-medium">{content}</p>
      <h3 className="text-xl font-semibold mb-4">
        {department}
        </h3>
        <Link
        to={`/doctordetails?department=${id}`}
        className="mt-4 text-white text-sm ml-2 uppercase bg-teal-900 p-3"
      >
        Book Appointment
      </Link>
      
      
    </div>
  );
};

const Departmentdetails = () => {
  const {client} =useAuthContext()
  console.log(client);
    const [data,setData] = useState([])  
    const [isLoading, setIsLoading] = useState(true)





  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
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
    ],
    
  };
  const fetchData = async () => {
    try {
        const response = await axios.get('/api/client/getDepartment',{
        headers:{
          'Authorization': ` ${client.token}`
        }
        })
        const departments = response.data; 
        console.log(departments);
        setData(departments); 
         
        
    } catch (err) {
        console.error(err.message);
    }
    finally {
      setIsLoading(false);
    }
};
useEffect(() => {
    fetchData()

}, [])


  return (
    <>
    <div className="sm:h-[400px]  flex justify-center  " >
         <img className="h-[400px] w-full  md:mt-0 md:h-[400px]  " src="https://res.cloudinary.com/dqzhitag2/image/upload/v1680418196/Main%20Project/doctorshome1_vklvif.jpg" alt="" />
        </div>
    <div className="max-w-[1300px] mx-auto py-8 px-4 sm:px-6 lg:py-12 lg:px-8">
        <h1 className=" font-extrabold text-3xl flex justify-center">DEPARTMENTS</h1>
       

  {isLoading ? (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
  <ClipLoader css="display: block; margin: 0 auto; border-color: red;" size={200} color={"teal-900"} loading={true} />
</div>
) : (

      <Slider {...settings}>
        {data.map((card) => (
          <div key={card.id}>
            <RoundCard
              title={card.title}
              content={card.department}
              image={card.image}
              id={card._id}
            />
          </div>
        ))}
      </Slider>
      )}
      
    </div>
    </>
  
  );
};

export default Departmentdetails;
