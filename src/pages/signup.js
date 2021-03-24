import { useState } from 'react';

function Signup() {
  // create states for the controlled form components
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  // handle submission of the login form
  const signupSubmitHandler = e => {
    // prevent the page from refreshing
    e.preventDefault();

    // send a post request with a JSON payload containing the creditentials you're trying to use
    fetch('http://localhost:8080/auth/signup', {
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
        console.log(data);
      })
      // handle a client-side error
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={signupSubmitHandler}>
      <h1>Sign Up</h1>
      <div>
        <label htmlFor="username">Username:</label>
        <input id="username" value={usernameValue} onChange={({ target }) => setUsernameValue(target.value)} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input id="password" value={passwordValue} onChange={({ target }) => setPasswordValue(target.value)} />
      </div>
      <button>Sign Up</button>
    </form>
  );
}

export default Signup;