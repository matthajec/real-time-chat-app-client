import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: ${props => props.theme.font.stack}
  }

  body {
    margin: 0;
    padding: 0;
    background-color: ${props => props.theme.colors.dark};
    color: ${props => props.theme.colors.white};
    font-size: ${props => props.theme.font.size.default};
    font-family: ${props => props.theme.font.stack}
  }

  h1,h2,h3,h4,h5,h6,p {
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyle;