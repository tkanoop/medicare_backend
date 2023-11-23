import React, { useEffect,useState } from 'react'
import { useAuthContext } from '../hooks/admin/useAuthContext'
import axios from '../instance/axios'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function DocProfile() {
  const [modal, setModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [docName, setDocName] = useState("");
  const [department, setDepartment] = useState("");
  const [age, setAge] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [image,setImage] = useState("")

  const {doctor} = useAuthContext()
 
  const fetchDoctor = async () => {
    const response = await axios.get(`/api/doctor/getDoctor`, {
      headers: {
        Authorization: ` ${doctor.token}`,
      },
    });
    console.log(response.data);
    if (response.statusText === "OK") {
      setDocName(response.data.name);
      setDepartment(response.data.department);
      setEmail(response.data.email);
      setMobile(response.data.mobile);
      setAge(response.data.speciality);
      setImage(response.data.image)
    }

    
  };
  useEffect(() => {
    fetchDoctor();
  }, []);

  const handleChangePassword = () => {
    setModal(!modal);
    // logic to handle change password
  };
  const handleSubmit = async() => {
    if (!cPassword || !currentPassword || !newPassword) {
      return toast.warning("All field is required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (newPassword != cPassword) {
      return toast.warning("confirm password and new password must be same", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    
    try {
      
   
    const response = await axios.patch(
       `/api/doctor/changePassword`,
      {
        
        cPassword,
        currentPassword,
        newPassword,
      },
      {
        headers: {
          Authorization: ` ${doctor.token}`,
        },
      }
    );
   
    if (response.statusText === 'OK') {
       toast.success("Password Changed successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      
      setCPassword('')
      setCurrentPassword('')
      setNewPassword('')
    }
    console.log(response.data);
  } catch (error) {
    toast.error("Please enter Correct Password", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

      
  }



  };





  return (
    <div className="flex">
  <div className="rounded-lg bg-white p-8 mx-auto text-center mt-24  ">
    <img src={image} alt="Card Image" className="rounded-full mx-auto" style={{ height: "200px", width: "200px", borderRadius: "50%" }} />
    <h3 className="text-xl font-semibold mb-4"></h3>
    <p className="text-blue-500"></p>
  </div>
  <div className="rounded-lg bg-white p-8 mx-2 text-center">
    <div>
    <div className="flex flex-col items-center justify-center ">
      <div className="bg-gray-400 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">{docName}</h1>

          <span className="text-black">{department}</span>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="age"
            >
              Speciality
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
               id="age"
              type="text"
              value={age}
              readOnly
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="phone"
              type="text"
              value={mobile}
              readOnly
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="email"
              type="text"
              value={email}
              readOnly
            />
          </div>
        </div>
        <button
          className="bg-green-500 shadow-md  hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleChangePassword}
        >
          Change Password
        </button>
      </div>
    </div>
    {modal && (
      <div className="fixed z-20 inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-white p-2 rounded w-96 m-5">
          <div className="flex justify-between">
            <h1 className="font-semibold text-center text-2xl px-5 my-5 text-gray-700">
              {"Details"}
            </h1>
            <button
              className="font-semibold mr-3 mb-8 text-xl"
              onClick={() => setModal(!modal)}
            >
              X
            </button>
          </div>
          <div className="flex flex-col  p-5">
            <form>
              <label className="block font-normal " htmlFor="name">
                Current Password
              </label>
              <input
                type="text"
                id="first_name"
                className="mt-1 bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="current Password"
              />
              <label className="block font-normal " htmlFor="name">
                New Password
              </label>
              <input
                type="password"
                id="first_name"
                className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <label className="block font-normal " htmlFor="name">
                Confirm Password
              </label>
              <input
                type="password"
                id="first_name"
                value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
                className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5"
                placeholder="Confirm Password"
              />
              <div className="text-center p-2">
                <button
                  onClick={handleSubmit}
                  type="button"
                  className=" px-5 py-1 bg-gray-700 text-white text-lg rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )}
    <ToastContainer />
    
  </div>
  </div>
  </div>
);
}

  


export default DocProfile
