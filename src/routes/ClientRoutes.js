import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { useAuthContext } from "../hooks/admin/useAuthContext";

// Client Pages
import LandingPage from "../pages/client/landingPage";
import Doctors from "../pages/client/Doctors";
import Departments from "../pages/client/Departments";
import Signup from "../pages/client/Signup";
import Login from "../pages/client/Login";
import Verify from "../pages/client/Verify";
import DepartmentDoctor from "../pages/client/DepartmentDoctor";
import BookThisDoctor from "../pages/client/BookThisDoctor";
import PatientProfile from "../pages/client/PatientProfile"
import ErrorPage from "../pages/client/ErrorPage";

function ClientRoutes() {
  const {client} = useAuthContext()
  console.log(client);
  return (
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route exact path="/home" element={<LandingPage />} />
      <Route exact path="/doctors" element={client ? <Doctors /> : <Navigate to ={'/login'}/>} />
      <Route exact path="/departments" element={client ? <Departments />: <Navigate to ={'/login'}/>} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/login" element={!client ?<Login /> :<Navigate to ={'/departments'}/> } />
      <Route exact path="/verify" element={<Verify />} />
      <Route exact path="/doctordetails" element={client ? <DepartmentDoctor/> : <Navigate to ={'/login'}/>}/>
      <Route exact path="/doctorbooking" element={client?<BookThisDoctor/>:<Navigate to ={'/login'}/>}/>
      <Route exact path="/profile" element={client?<PatientProfile/>:<Navigate to ={'/login'}/>}/>
      {/* <Route exact path="/*" element={<ErrorPage />} /> */}
    </Routes>
  );
}

export default ClientRoutes;
