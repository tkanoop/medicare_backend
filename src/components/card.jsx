import React from 'react';


const Cards = () => {
  return (
    <div>
        <h1 className='flex justify-center font-bold text-3xl'>DEPARTMENTS</h1>
    <div className='w-full py-[10rem] px-4 bg-white'>
      <div className='w-full mx-auto grid md:grid-cols-4 gap-8'>
      <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
              <img className=' mx-auto mt-[-3rem] bg-white rounded-full h-[200px]' src='https://res.cloudinary.com/dqzhitag2/image/upload/v1679079319/Main%20Project/skin_tqbczr.jpg' alt="/" />
              
             
              <button className='bg-[#074A52] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 text-white'>SKIN</button>
          </div>
          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
              <img className=' mx-auto mt-[-3rem] bg-white rounded-full h-[200px]' src='https://res.cloudinary.com/dqzhitag2/image/upload/v1679079318/Main%20Project/dental_care_hxksmt.jpg' alt="/" />
              
             
              <button className='bg-[#074A52] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 text-white'>DENTISTRY</button>
          </div>
          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
              <img className='w mx-auto mt-[-3rem] bg-white rounded-full h-[200px]'  src='https://res.cloudinary.com/dqzhitag2/image/upload/v1679079318/Main%20Project/child_iyvmzg.jpg' alt="/" />
             
             
              <button className='bg-[#074A52] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 text-white'>CHILD</button>
          </div>
          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
              <img className='w mx-auto mt-[-3rem] bg-white rounded-full h-[200px]'  src='https://res.cloudinary.com/dqzhitag2/image/upload/v1679080232/Main%20Project/ent_1024x678_kwtwu6.jpg' alt="/" />
             
             
              <button className='bg-[#074A52] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 text-white'>ENT</button>
          </div>
          
      </div>
    </div>
    </div>
  );
};

export default Cards;