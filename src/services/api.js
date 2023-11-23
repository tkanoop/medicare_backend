import axios from "../instance/axios";
import { useAuthContext } from "../hooks/admin/useAuthContext"


export const AddDepartmentAPI = (formData) => {
  const {admin}=useAuthContext()
  
  return axios.post("/api/admin/addDepartment", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      'Authorization': `${admin.token}`
    },
  });
};


export const AddDoctorAPI = (formData) => {
  const {admin}=useAuthContext()
  return axios.post('/api/admin/addDoctor',formData,{
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `${admin.token}`
    },
    
  })
};

export const GetDoctorsApi = async () => {
  const {admin}=useAuthContext()

  try {
    const response = await axios.get("/api/admin/getDoctors", {
      headers: {
        Authorization : `${admin.token}`
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

