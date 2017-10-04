/* export default `
    .keypad-enter {
        transform: translate(100%);
    }
    .keypad-enter.keypad-enter-active {
        transform: translate(0%);
        transition: transform 1000ms ease-in-out;
    }
    .keypad-leave {
        transform: translate(0%);
    }
    .keypad-leave.keypad-leave-active {
        transform: translate(-100%);
        transition: transform 1000ms ease-in-out;
    }
` */

export default `
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