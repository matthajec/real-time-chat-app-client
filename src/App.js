import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import GlobalStyle from './globalStyles';
import Login from './pages/login';
import Signup from './pages/signup';
import Chatroom from './pages/chatroom';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Switch>
        <Route exact path="/">
          <h1>Home!</h1>
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/chat">
          <Chatroom />
        </Route>
        <Route path="/">
          <h1>404 | Page Not Found</h1>
        </Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;