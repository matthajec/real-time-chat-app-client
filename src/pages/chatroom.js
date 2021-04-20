import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import io from 'socket.io-client';
import { Container, ChatInput, ChatMessage } from '../components';

function Chatroom() {
  // get location object
  const location = useHistory();

  // create state for controlled input
  const [messageValue, setMessageValue] = useState('');

  // create state to store messages
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (
      !localStorage.getItem('jwt_token') ||
      Date.now() / 1000 - parseInt(localStorage.getItem('jwt_expiration')) >= 0
    ) {
      return location.push('/login');
    }

    // open a socket
    const socket = io.connect('http://localhost:8080', {
      secure: true
    });

    // send the token over the socket
    socket.emit('authorization', localStorage.getItem('jwt_token'));

    // listen for the authorization response
    socket.on('authorization', res => {
      if (res.status !== 'joined') {
        location.push('/login');
      }
    });

    // listen for requests on the messages channel
    socket.on('messages', (data) => {
      // handle a new message
      if (data.action === 'post') {
        console.log('posting new message');
        setMessages(prevState => {
          return [...prevState, data.message];
        });
        // handle deleting a message
      } else if (data.action === 'delete') {
        setMessages(prevState => {
          const newMessages = prevState.filter(m => m._id !== data.messageId);
          return newMessages;
        });
      }

    });

    // fetch the last 100 messages before you arrived
    fetch('http://localhost:8080/messages', {
      method: 'GET',
      headers: {
        'Authorization': localStorage.getItem('jwt_token')
      }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setMessages(data.data.reverse());
      })
      .catch(err => {
        console.log(err);
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
      <ChatMessage key={m._id}>
        <ChatMessage.Author>{m.creator.username}:</ChatMessage.Author>
        <ChatMessage.Message>{m.message}</ChatMessage.Message>
        <ChatMessage.Delete onClick={() => messageDeleteHandler(m._id)}> Delete </ChatMessage.Delete>
      </ChatMessage>
    );
  });

  return (
    <Container fd="column" ai="left" jc="space-between">
      <Container fd="column" ai="left" jc="flex-start" mh="0">
        <h1>Welcome, {localStorage.getItem('jwt_username')}</h1>
        {messageComponents}
      </Container>

      <ChatInput onSubmit={messageSubmitHandler}>
        <ChatInput.Input value={messageValue} onChange={({ target }) => setMessageValue(target.value)} />
        <ChatInput.Submit>Send</ChatInput.Submit>
      </ChatInput>
    </Container>
  );
}

export default Chatroom;
