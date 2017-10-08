export default `
    html {
        touch-action: manipulation;
    }
    * {
        font-family: Open sans, sans-serif;
    }
    .keypad-appear {
        transform: translate(0, 300px);
    }    
    .keypad-appear.keypad-appear-active {
        transform: translate(0);
        transition: transform 500ms ease-in-out;
    }    
`