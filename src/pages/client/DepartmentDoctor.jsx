import React from 'react'
import Nav from '../../components/nav'
import Footer from '../../components/Footer'
import DepartmentDoctors from '../../components/DepartmentDoctors.jsx'
import { useLocation } from "react-router-dom";


  
  export default function DepartmentDoctor() {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("department");
  console.log(id);
  return (
    <>
    <Nav/>
    <DepartmentDoctors id1={id}/>


    <Footer/>
    </>
  )
}
