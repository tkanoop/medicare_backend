
import * as Yup from 'yup';

const clientLoginValidation = Yup.object().shape({
 
  mobile: Yup.string().matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Mobile number is not valid').required('Mobile number is required'),
  password: Yup.string().required('Password is required'),
 

})
export default clientLoginValidation;