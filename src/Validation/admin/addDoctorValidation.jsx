
import * as Yup from 'yup';

const addDoctorValidation = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  department: Yup.string().required('Department is required'),
  speciality: Yup.string().required('Speciality is required'),
  mobile: Yup.string().matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Mobile number is not valid').required('Mobile number is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  language: Yup.string().required('language is required'),
  hospital: Yup.string().required('Hospital is required'),
  image: Yup.mixed()
    .required('Image is required')
    .test('fileType', 'Please upload an image file', (value) => {
      return value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
    }),

})
export default addDoctorValidation;