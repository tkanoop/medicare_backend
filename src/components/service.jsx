import React from 'react'
import { Icon } from '@iconify/react';

const service = () => {
  return (
    <>
      <h1 className='flex sm:justify-center font-semibold text-3xl mt-8  mx-8'>How Our Health System Works?</h1>

      <div className='w-full py-[4rem] px-4 bg-white '>
        <div className='flex w-full mx-auto gap-8 md:flex-row flex-col justify-around '>
          <div className='  shadow-2xl  flex flex-col p-4 my-4 rounded-lg  items-center justify-center border-black border'>

            <Icon icon="material-symbols:person-add" className='' style={{ fontSize: '25px', color: '#DE1F58' }} />
            <h1 className='flex justify-start font-semibold text-[#DE1F58] text-sm'> SELECT</h1>
            <h1 className='flex justify-start font-sm text-black text-sm'> The doctor as per you need
              and time that best suits you!</h1>

          </div>
          <div className=' shadow-2xl flex flex-col p-4 my-4 rounded-lg  items-center justify-center border-black border'>

            <Icon icon="material-symbols:person-add" className='' style={{ fontSize: '25px', color: '#DE1F58' }} />
            <h1 className='flex justify-start font-semibold text-[#DE1F58] text-md'> SIGN UP/LOGIN</h1>
            <h1 className='flex justify-start font-sm text-black text-sm'> To book the slot with your
              doctor and pay your
              consultation</h1>


          </div>
          <div className='  shadow-2xl  flex flex-col p-4 my-4 rounded-lg justify-center items-center  border-black border'>

            <Icon icon="material-symbols:person-add" className='' style={{ fontSize: '25px', color: '#DE1F58' }} />
            <h1 className='flex justify-start font-semibold text-[#DE1F58] text-sm'> CONNECT</h1>
            <h1 className='flex justify-start font-sm text-black text-sm'> Share your health concerns
              with privacy and get better</h1>

          </div>



        </div>
      </div>
      </>

      );
}

      export default service