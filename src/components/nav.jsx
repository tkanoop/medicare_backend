// import React, { useState } from "react";
// import { ImMenu } from 'react-icons/im'

// import { NavLink } from "react-router-dom";

// function Nav() {

//   const [navb, setNavb] = useState(false)



//   return (

//     <>



//       <nav className="flex  items-center justify-between flex-wrap bg-[#074A52] shadow-2xl ">
//         <div className="flex  items-center flex-shrink-0 text-white mr-6 p-3 " >
//           <img className="h-[70px] w-[160px]" src="https://res.cloudinary.com/dqzhitag2/image/upload/v1679374789/Main%20Project/logowebsite-removebg-preview_1_d9lqnd.png" alt="Logo" />
//           <h1 className="logo text uppercase font-bold text-3xl">Mankind </h1>
//         </div>
//         <div className="px-4 cursor-pointer md:hidden">
//           {<ImMenu size={26} />}

//         </div>
//         <div className="menu md:block hidden">
//           <NavLink to='/Home' className='pl-8 uppercase text-white font-semibold'>HOmE</NavLink>
//           <NavLink to='/Doctors' className='pl-8 uppercase text-white font-semibold'>Doctors</NavLink>
//           <NavLink to='/Departments' className='pl-8 uppercase text-white font-semibold'>Departments</NavLink>

//         </div>
//         <div className="login md:block hidden">
//           <NavLink to='/signup' className='pr-8 uppercase text-white font-semibold'>Login</NavLink>
//         </div>



//       </nav>
//       </>
//   )
// }
// export default Nav;




import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ImMenu } from 'react-icons/im';
import { useAuthContext } from "../hooks/admin/useAuthContext";
import { useLogout } from '../hooks/client/useLogout';

function Nav() {
  const { logout } = useLogout();
  const { client } = useAuthContext();
  console.log(client);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleLogout = () => {
    logout();
  };

  function handleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  return (
    <nav className="flex items-center justify-between flex-wrap bg-[#074A52] shadow-2xl">
      <div className="flex items-center flex-shrink-0 text-white  py-2">
        <img
          className="h-[70px] w-[160px]"
          src="https://res.cloudinary.com/dqzhitag2/image/upload/v1679374789/Main%20Project/logowebsite-removebg-preview_1_d9lqnd.png"
          alt="Logo"
        />
        <h1 className="logo text uppercase font-bold text-3xl">Mankind</h1>

        <div className="flex ml-12 cursor-pointer md:hidden text-black" onClick={handleDropdown}>
          <ImMenu size={26} />
        </div>
      </div>
      <div className="menu md:flex hidden">
        <NavLink to="/home" className="pl-8 uppercase text-white font-semibold">
          Home
        </NavLink>
        <NavLink to="/doctors" className="pl-8 uppercase text-white font-semibold">
          Doctors
        </NavLink>
        <NavLink to="/departments" className="pl-8 uppercase text-white font-semibold">
          Departments
        </NavLink>
        {client ? (
        <NavLink to="/profile" className="pl-8 uppercase text-white font-semibold">
          Profile
        </NavLink>
        ) : (
          <div>
            </div>
        )
}
      </div>
      <div className="w-[200px]  md:flex hidden ">
        {client ? (
          <button className="pl-8 uppercase text-white font-semibold mr-8" onClick={handleLogout}>
            logout
          </button>
        ) : (
          <div>
            <NavLink to="/login">
              <button className="pl-8 uppercase text-white font-semibold mr-8">LOGIN</button>
            </NavLink>
          </div>
        )}
      </div>
      {isDropdownOpen && (
        <div className="dropdown  md:relative top-full left-0 md:top-0 mt-2 md:mt-0 w-full md:w-auto bg-[#074A52]">
          <NavLink to='/home' className='block px-4 py-2 text-white font-semibold'>HOME</NavLink>
          <NavLink to='/doctors' className='block px-4 py-2 text-white font-semibold'>DOCTORS</NavLink>
          <NavLink to='/departments' className='block px-4 py-2 text-white font-semibold'>DEPARTMENTS</NavLink>
          <NavLink to='/login' className='block px-4 py-2 text-white font-semibold'>SIGN IN</NavLink>

        </div>
      )}
    </nav>
  );
}

export default Nav;










