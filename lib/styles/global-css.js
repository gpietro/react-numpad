import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
html {
  touch-action: manipulation;
}
${props =>
  props.display
    ? `
body {
overflow-y: hidden;
-webkit-overflow-scrolling: touch;
 
}
`
    : ``}
`;

export default GlobalStyle;
