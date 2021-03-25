import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { Form, Container } from '../components';
import jwt_decode from 'jwt-decode';

function Signup() {
  // get location object
  const location = useHistory();

  // create formik object
  const formik = useFormik({
    // set inital values
    initialValues: {
      username: '',
      password: '',
    },
    // create a validation schema with Yup
    validationSchema: Yup.object({
      username: Yup.string()
        .matches(/^[a-zA-Z0-9]+$/, 'Invalid Username')
        .min(3, 'Invalid Username')
        .max(22, 'Invalid Username')
        .required('Required'),
      password: Yup.string()
        .min(7, 'Invalid Password')
        .matches(/[^a-zA-Z]/g, 'Invalid Password')
        .required('Required'),
    }),
    // handle form submission
    onSubmit: values => {
      // initialize status in higher scope
      let status = null;

      // post the username and password to the server to check it
      fetch('http://localhost:8080/auth/login', {
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
          if (status === 200) {
            localStorage.setItem('jwt_token', data.token);
            console.log('nice one');
            location.push('/chat');
          } else if (status === 422) { // handle a validation error
            let newErrors = {};

            // for each error create a key/value pair with the paramerter and the message
            data.data.forEach(error => {
              newErrors[error.param] = error.msg;
            });

            // set the formik errors to the errors from the server
            formik.setErrors(newErrors);
          }
        });
    }
  });

  return (
    <Container>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Title>
          Log In
        </Form.Title>


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

        <Form.Submit>Log In</Form.Submit>
      </Form>
    </Container>
  );

}

export default Signup;