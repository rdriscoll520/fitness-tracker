import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #101010;
    color: #ffffff;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 0;
  }

  a {
    color: #58A6FF;
    text-decoration: none;
  }

  a:hover {
    color: #1F6FEB;
  }
`;

export default GlobalStyle;
