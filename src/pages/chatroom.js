import { useEffect, useState } from 'react';
import openSocket from 'socket.io-client';

function Chatroom() {
  // create state for controlled input
  const [messageValue, setMessageValue] = useState('');

  // create state to store messages
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // fetch the last 100 messages before you arrived
    fetch('http://localhost:8080/messages', {
      method: 'GET',
      headers: {
        'Authorization': localStorage.getItem('jwt_token')
      }
    })
      .then(res => res.json())
      .then(data => setMessages(data.data))
      .catch(err => {
        console.log(err);
      });


    const socket = openSocket('http://localhost:8080');
    socket.on('messages', (data) => {
      setMessages(prevState => {
        return [data.message, ...prevState];
      });
    });
  }, []);

  const messageSubmitHandler = e => {
    e.preventDefault();

    fetch('http://localhost:8080/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('jwt_token')
      },
      body: JSON.stringify({
        message: messageValue
      })
    });
  };


  const messageComponents = messages.map(m => {
    return <p key={m._id}>{m.message}</p>;
  });

  return (
    <div className="App">
      <h1>Welcome, {localStorage.getItem('jwt_username')}</h1>
      <hr />
      {messageComponents}
      <hr />
      <form onSubmit={messageSubmitHandler}>
        <label>Message: </label>
        <input value={messageValue} onChange={({ target }) => setMessageValue(target.value)} />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Chatroom;
