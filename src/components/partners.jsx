import React from 'react'
import { Icon } from '@iconify/react';


const partners = () => {
  return (
    <div>
    <h1 className='flex justify-center font-bold text-3xl mt-16'>PARTNERS</h1>
<div className='w-full py-[4rem] px-4 bg-white'>
  <div className='w-full mx-auto grid md:grid-cols-3 gap-8'>
  <div className='w-full  flex flex-col p-4 my-4 rounded-lg justify-center items-center'>
  
          <Icon icon="pixelarticons:buildings" className='' style={{ fontSize: '80px',color:'blue' }}  />
          <h1 className='flex justify-center font-bold text-[#3F1BD2] text-xl'> MOISTER CARD</h1>
         
          
      </div>
      <div className='w-full  flex flex-col p-4 my-4 rounded-lg justify-center items-center '>
      <Icon icon="fxemoji:sunsetoverbuildings" style={{ fontSize: '80px' }} />
      <h1 className='flex justify-center font-bold text-[#FC7E17] text-xl'>EPIDEC CLINIC</h1>
          
         
         
      </div>
      <div className='w-full  flex flex-col p-4 my-4 rounded-lg justify-center items-center '>
      <Icon icon="fxemoji:housebuildings" style={{ fontSize: '80px' }} />
      <h1 className='flex justify-center font-bold text-[#FF473E] text-xl'>AURORA HEALTH</h1>
         
         
        
      </div>
      <div className='w-full  flex flex-col p-4 my-4 rounded-lg justify-center items-center'>
  
      <Icon icon="uis:hospital"  className='' style={{ fontSize: '80px',color:'#DE1F58' }}  />
  <h1 className='flex justify-center font-bold text-[#DE1F58] text-xl'> JINJA SYSTEMS</h1>
 
  
</div>
<div className='w-full  flex flex-col p-4 my-4 rounded-lg justify-center items-center '>
<Icon icon="pixelarticons:buildings" style={{ fontSize: '80px',color:'#074A52' }} />
<h1 className='flex justify-center font-bold text-[#074A52] text-xl'>ONE HEALTH</h1>
  
 
 
</div>
<div className='w-full  flex flex-col p-4 my-4 rounded-lg justify-center items-center  '>
<Icon icon="ph:buildings-bold" style={{ fontSize: '80px',color: '#E58597' }} />
<h1 className='flex justify-center font-bold text-[#E58597] text-xl'>UP LABS</h1>
 
 

</div>
      
      
  </div>
</div>
</div>
);
};



export default partners