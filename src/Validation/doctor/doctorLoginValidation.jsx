import * as Yup from 'yup';

const doctorLoginValidation = Yup.object().shape({
 
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
 

})
export default doctorLoginValidation;