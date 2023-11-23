import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from "react";
import axios from '../instance/axios'
import { useAuthContext } from "../hooks/admin/useAuthContext";
import { ClipLoader } from 'react-spinners';







const RoundCard = ({ title, content, image }) => {
  return (
    <div className=" rounded-lg bg-white p-8 mx-2 text-center " >
      <img src={image} alt="Card Image" className="rounded-full mx-auto" style={{ height: "200px", width: "200px", borderRadius: "50%" }} />
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-blue-500">{content}</p>

    </div>
  );
};

const RoundCardCarousel = () => {
  const { client } = useAuthContext()
  const [doctor, setDoctor] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const getDoctors = async () => {
    try {
      const response = await axios.get("/api/client/getDoctors", {
        headers: {
          'Authorization': ` ${client.token}`
        }
      })
      setDoctor(response.data)
      setIsLoading(false);
      console.log(response.data);


    } catch (error) {

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

  return (
    <>
      <div className="sm:h-[400px]  flex justify-center  " >
        <img className="h-[400px] w-full  md:mt-0 md:h-[400px]  " src="https://res.cloudinary.com/dqzhitag2/image/upload/v1680431987/Main%20Project/wallpaperflare.com_wallpaper_c5jwwm.jpg" alt="" />
      </div>
      <div className="max-w-[1300px] mx-auto py-8 px-4 sm:px-6 lg:py-12 lg:px-8">
        <h1 className=" font-extrabold text-3xl flex justify-center">OUR DOCTORS</h1>




        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <ClipLoader size={200} color={"teal-900"} />
          </div>
        ) : (
          <Slider {...settings}>
            {doctor.map((card) => (
              <div key={card.id}>
                <RoundCard
                  title={card.name}
                  content={card.department}
                  image={card.image}
                />
              </div>
            ))}
          </Slider>
        )}

      </div>
    </>

  );
};

export default RoundCardCarousel;
