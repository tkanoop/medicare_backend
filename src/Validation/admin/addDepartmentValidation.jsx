import * as Yup from 'yup';

const addDepartmentValidation = Yup.object().shape({
  department: Yup.string().required('Department is required'),
  image: Yup.mixed()
    .required('Image is required')
    .test('fileType', 'Please upload an image file', (value) => {
      return value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
    }),
});
export default addDepartmentValidation;

