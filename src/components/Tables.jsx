import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axios from "../instance/axios"

function Tables() {
    const[client,setClient] =useState([])
    const getClients=async() =>{
        try {
            const response = await axios.get("/api/admin/getClients")
         
            setClient(response.data)
           
            
        } catch (error) {
            
        }
    };
    const columns = [
        {
            name: "name",
            selector:row => row.name
        },
        {
            name: "age",
            selector:row => row.age
        },
        {
            name: "gender",
            selector:row => row.gender
        },

    ];
    useEffect(()=>{
        getClients();
    },[]);

  return <DataTable columns={columns} data={client}/>
    
  
}

export default Tables