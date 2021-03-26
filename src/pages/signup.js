import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { Form, Container } from '../components';

function Signup() {
  // get location object
  const location = useHistory();

  // create formik object
  const formik = useFormik({
    // set inital values
    initialValues: {
      username: '',
      password: '',
      verifyPassword: ''
    },
    // create a validation schema with Yup
    validationSchema: Yup.object({
      username: Yup.string()
        .matches(/^[a-zA-Z0-9]+$/, 'Must only contain letters and numbers')
        .min(3, 'Must be at least 3 characters')
        .max(22, 'Must be less than 22 characters')
        .required('Required'),
      password: Yup.string()
        .min(7, 'Password must be at least 7 characters')
        .matches(/[^a-zA-Z]/g, 'Must contain a number or special character')
        .required('Required'),
      verifyPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required')
    }),
    // handle form submission
    onSubmit: values => {
      // initialize status in higher scope
      let status = null;

      // post the username and password to the server to check it
      fetch('http://localhost:8080/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password
        })
      })
        .then(res => {
          // set the status
          status = res.status;
          return res.json();
        })
        .then(data => {
          // handle success

          if (status === 201) {
            location.push('/login');
          } else if (status === 422) {// handle a validation error
            let newErrors = {};

            // for each error create a key/value pair with the paramerter and the message
            data.data.forEach(error => {
              newErrors[error.param] = error.msg;
            });

            // set the formik errors to the errors from the server
            formik.setErrors(newErrors);
          }
          console.log(data);
        })
        .catch(err => {
          formik.setStatus(err.message || 'An unknown error occured.');
        });
    }
  });

  return (
    <Container>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Title>
          Sign Up
        </Form.Title>

        {formik.status && <Form.Error>{formik.status}</Form.Error>}

        <Form.Input
          label="username"
          id="username"
          type="text"
          error={formik.touched.username && formik.errors.username ? true : false}
          {...formik.getFieldProps('username')}
        />
        {formik.touched.username && formik.errors.username ? (
          <Form.Error>{formik.errors.username}</Form.Error>
        ) : null}

        <Form.Input
          label="password"
          id="password"
          type="password"
          error={formik.touched.password && formik.errors.password ? true : false}
          {...formik.getFieldProps('password')}
        />
        {formik.touched.password && formik.errors.password ? (
          <Form.Error>{formik.errors.password}</Form.Error>
        ) : null}

        <Form.Input
          label="Verify Password"
          id="verifyPassword"
          type="password"
          error={formik.touched.verifyPassword && formik.errors.verifyPassword ? true : false}
          {...formik.getFieldProps('verifyPassword')}
        />
        {formik.touched.verifyPassword && formik.errors.verifyPassword ? (
          <Form.Error>{formik.errors.verifyPassword}</Form.Error>
        ) : null}

        <Form.Submit>Sign Up</Form.Submit>
        <Form.Text>Already registered? <Form.TextLink to="/login">Log in</Form.TextLink> instead.</Form.Text>
      </Form>
    </Container>
  );

}

export default Signup;