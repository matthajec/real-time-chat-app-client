import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import jwt_decode from 'jwt-decode';


import { Form } from '../components';

function Login() {
  // create states for the controlled form components
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [errors, setErrors] = useState([]);

  // get the location object from react-router-dom
  const location = useHistory();

  // handle submission of the login form
  const loginSubmitHandler = e => {
    // prevent the default action
    e.preventDefault();

    // send a post request with a JSON payload containing the creditentials you're trying to use
    fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: usernameValue,
        password: passwordValue
      })
    })
      // parse the response
      .then(res => {
        if (res.status === 404) {
          throw new Error('Username does not exist');
        }
        if (res.status === 500) {
          throw new Error('An internal server error occured');
        }
        if (res.status === 401) {
          throw new Error('Password is incorrect');
        }
        return res.json();
      })
      .then(data => {
        // store everything from the JWT inside of localStorage
        console.log('this shouldn\'t run!!');
        const { exp, iat, userId, username } = jwt_decode(data.token);
        localStorage.setItem('jwt_token', data.token);
        localStorage.setItem('jwt_exp', exp);
        localStorage.setItem('jwt_iat', iat);
        localStorage.setItem('jwt_userId', userId);
        localStorage.setItem('jwt_username', username);

        location.push('/chat');
      })
      // handle a client-side error
      .catch(err => {
        setErrors(prevState => {
          return [...prevState, err.message];
        });
      });
  };

  return (
    <Form onSubmit={loginSubmitHandler}>
      <Form.Title>Log In</Form.Title>
      {errors && errors.map(e => {
        return <Form.Error key={uuid()}>{e}</Form.Error>;
      })}
      <Form.Input label="username" value={usernameValue} setValue={setUsernameValue} />
      <Form.Input
        label="password"
        type="password"
        value={passwordValue}
        setValue={setPasswordValue}
      />
      <Form.Submit>Log In</Form.Submit>
    </Form>
  );
}

export default Login;