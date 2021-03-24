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
      if (data.action === 'post') {
        setMessages(prevState => {
          return [data.message, ...prevState];
        });
      } else if (data.action === 'delete') {
        setMessages(prevState => {
          const newMessages = prevState.filter(m => m._id !== data.messageId);
          return newMessages;
        });
      }

    });
  }, []);

  const messageSubmitHandler = e => {
    e.preventDefault();
    setMessageValue('');

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

  const messageDeleteHandler = _id => {
    fetch('http://localhost:8080/messages', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('jwt_token')
      },
      body: JSON.stringify({
        messageId: _id
      })
    });
  };


  const messageComponents = messages.map(m => {
    return (
      <div key={m._id}>
        <p>{m.creator.username}:</p>
        <p>{m.message}</p>
        <button onClick={() => messageDeleteHandler(m._id)}>Delete</button>
        <br />
        <br />
        <br />

      </div>
    );
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
