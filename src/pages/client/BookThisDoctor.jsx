import React from 'react'
import Nav from '../../components/nav'
import Footer from '../../components/Footer'
import TimeSlotBookingPage from '../../components/TimeSlotBookingPage'
import { useLocation } from 'react-router-dom'

function BookThisDoctor() {

  const location = useLocation();
  const { id, title, image, content, departmentId,time,speciality } = location.state;



  return (
    <>
    <Nav/>
    <TimeSlotBookingPage id={id} departmentid={departmentId} title={title} image={image} content={content}
    departmentId = {departmentId} time={time} speciality={speciality}/>
    <Footer/>
    </>
  )
}

export default BookThisDoctor