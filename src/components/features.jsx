import React from 'react'
import { Icon } from '@iconify/react';

const features = () => {
  return (
    <>

      <h1 className='flex justify-center font-semibold text-3xl mt-8' >Why You Should Choose Us?</h1>
      <div className='w-full py-[4rem] px-4 bg-white '>
        <div className='flex w-full mx-auto gap-8 md:flex-row flex-col '>


          <div className="name1 md:w-1/3 flex justify-center ">


            <div className='flex h-[100px] w-[100px]  p-4 my-4 rounded-full justify-center items-center bg-[#074A52]'>
            

              <Icon icon="game-icons:life-support" className='' style={{ fontSize: '25px', color: '#DFB10F' }} />


            </div>


          </div>
             

          <div className="name1  md:w-1/3 flex justify-center ">


            <div className='flex h-[100px] w-[100px]  p-4 my-4 rounded-full justify-center items-center bg-[#074A52]'>

              <Icon icon="ic:sharp-privacy-tip" className='' style={{ fontSize: '25px', color: '#DFB10F' }} />

            </div>
          </div>
          <div className="name1 md:w-1/3 flex justify-center">


            <div className='flex h-[100px] w-[100px]  p-4 my-4 rounded-full justify-center items-center bg-[#074A52]'>

              <Icon icon="map:doctor" className='' style={{ fontSize: '25px', color: '#DFB10F' }} />

            </div>
          </div>
          </div>

          <div className='flex w-full mx-auto gap-8 md:flex-row flex-col mt-10 '>


          <div className="name1 md:w-1/3 flex justify-center ">


            <div className='flex h-[100px] w-[100px]  p-4 my-4 rounded-full justify-center items-center bg-[#074A52]'>

              <Icon icon="icon-park-outline:hospital-bed" className='' style={{ fontSize: '25px', color: '#DFB10F' }} />


            </div>


          </div>

          <div className="name1  md:w-1/3 flex justify-center">


            <div className='flex h-[100px] w-[100px]  p-4 my-4 rounded-full justify-center items-center bg-[#074A52]'>

              <Icon icon="teenyicons:hospital-solid" className='' style={{ fontSize: '25px', color: '#DFB10F' }} />

            </div>
          </div>
          <div className="name1 md:w-1/3 flex justify-center">


            <div className='flex h-[100px] w-[100px]  p-4 my-4 rounded-full justify-center items-center bg-[#074A52]'>

              <Icon icon="noto:ambulance" className='' style={{ fontSize: '25px', color: '#DFB10F' }} />

            </div>
          </div>




        </div>
      </div>
    </>

  )
}

export default features