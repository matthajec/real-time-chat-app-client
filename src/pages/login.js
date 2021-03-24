import { useState } from 'react';
import jwt_decode from 'jwt-decode';

function Login() {
  // create states for the controlled form components
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  // handle submission of the login form
  const loginSubmitHandler = e => {
    // prevent the page from refreshing
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
      .then(res => res.json())
      .then(data => {
        // store everything from the JWT inside of localStorage
        const { exp, iat, userId, username } = jwt_decode(data.token);
        localStorage.setItem('jwt_token', data.token);
        localStorage.setItem('jwt_exp', exp);
        localStorage.setItem('jwt_iat', iat);
        localStorage.setItem('jwt_userId', userId);
        localStorage.setItem('jwt_username', username);
      })
      // handle a client-side error
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={loginSubmitHandler}>
      <h1>Log In</h1>
      <div>
        <label htmlFor="username">Username:</label>
        <input id="username" value={usernameValue} onChange={({ target }) => setUsernameValue(target.value)} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input id="password" value={passwordValue} onChange={({ target }) => setPasswordValue(target.value)} />
      </div>
      <button>Log In</button>
    </form>
  );
}

export default Login;