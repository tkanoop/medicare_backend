/* eslint-disable react/no-unescaped-entities */
import React from 'react';

function LandingComp(){
  return (

    <div
      className="  bg-[#F5F0E2] flex   items-center justify-center "
     >
      <div className=" text-center py-10 lg:py-24  w-full ">
        <h1 className="font-serif text-2xl sm:text-4xl font-bold ">
          WE'RE BUILDING A HOME FOR
          <br />
          HEALTHCARE
        </h1>
        <h1 className="mt-10 text-lg sm:text-3xl font-serif px-6 lg:text-center text-justify">
          A place where every type of patient can find every type of care. A
          place where they can see comprehensive providers and treatment
          options, with cost and quality info . A place where they can choose
          from a marketplace that is competing to serve them.
        </h1>
      </div>
    </div>
  );
}

export default LandingComp;