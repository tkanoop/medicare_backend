import { useState } from "react";
import { useAuthContext } from "../admin/useAuthContext";
import axios from '../../instance/axios';

export const useLogin = () => {
const [error, setError] = useState(null)
const [isLoading, setIsLoading] = useState(null)
const { dispatch } = useAuthContext()

const login = async (email, password) => {
setIsLoading(true)
setError(null)
try {
  const response = await axios.post('/api/doctor/login', { email, password })

  // handle success
  localStorage.setItem('doctor', JSON.stringify(response.data))
  dispatch({ type: 'DOCTORLOGIN', payload: response.data })
  setIsLoading(false)
} catch (error) {
  // handle error
  setIsLoading(false)
  setError(error.response.data.error)
}

  }
  return {login, isLoading, error}
}