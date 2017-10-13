export default `
  html {
      touch-action: manipulation;
  }
  * {
      font-family: Open sans, sans-serif;
      font-size: 1em;
  }
  .keypad-appear {
      transform: translate(0, 250px);
  }    
  .keypad-appear.keypad-appear-active {
      transform: translate(0);
      transition: transform 500ms ease-in-out;
  }    
`