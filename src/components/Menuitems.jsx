import React from 'react'

const Menuitems = () => {
  return (
 
    <div className="flex flex-col md:flex-row mt-16">
        
        <div className="  bg-[#36454F] flex justify-center items-center flex-col sm:h-[400px] sm:w-full h-[400px]">
            <h1 className='text-white font-semibold text-2xl '>Find The Right</h1>
            <h1 className=' text-[#ed8936] font-semibold text-3xl'>Doctor</h1>
            <h1 className='text-white font-semibold text-2xl text-center'>And Get The Best Care!</h1>
            
          
        </div>
        <div className=" sm:h-[400px] sm:w-full flex justify-center  " >
         <img className="h-[400px] w-full  md:mt-0 md:h-[400px]  " src="https://res.cloudinary.com/dqzhitag2/image/upload/v1679064651/Main%20Project/hosuserside_chuwmd.jpg" alt="" />
        </div>

    </div>








  )
}

export default Menuitems