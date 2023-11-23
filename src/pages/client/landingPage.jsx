import React from 'react';
import Menuitems from '../../components/Menuitems';
import Nav from '../../components/nav'
import Footer from '../../components/Footer';
import Cards from '../../components/card';
import Partners from '../../components/partners';
import Services from '../../components/service';
import LandingComp from '../../components/landingcomp.jsx';


function landingPage(){

    return(
        <>
        <Nav/>
        <Menuitems/>
      
        <Services/>
        <Cards/>
        <LandingComp/>
        
        <Partners/>
        <Footer/>
        </>
       

    );


}

export default landingPage;