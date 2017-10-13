export default `
  html {
      touch-action: manipulation;
  }
  * {
      font-family: Open sans, sans-serif;
      font-size: 1em;

      box-sizing: border-box;
      -webkit-box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
      margin: 0;
      padding: 0;
  }
  .keypad-appear {
      transform: translate(0, 250px);
  }    
  .keypad-appear.keypad-appear-active {
      transform: translate(0);
      transition: transform 500ms ease-in-out;
  }    

  #calendar {
    width: 640px;
    height: 480px;
    margin: 100px auto;
  }
  
  .Calendar-grid {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    cursor: pointer;
  }
  
  .Calendar-header {
    font-size: 1.2em;
    height: 50px;
    background: #333;
    color: #fff;
    text-align: center;
    line-height: 50px;
    display: flex;
    justify-content: space-between;
    text-transform: capitalize;        
    cursor: pointer;
  }
  
  .Calendar-header button {
    width: 50px;        
    border: 0;
    background: transparent;
    color: #ddd;
    cursor: pointer;
    outline: none;
  }
  
  .Calendar-grid-item {
    &:nth-child(-n+7) {
      background: #efefef;
    }
    &.active {
      font-weight: 700;
      color: white;
      background: #333;
    }
    flex: 0 14.28571%;
    text-align: center;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-transform: capitalize;
  }
  
  .Calendar-grid-item.nextMonth,
  .Calendar-grid-item.prevMonth {
    color: #999;
  }
  
  .Calendar-grid-item:nth-child(7n+1) {
    border-left: 1px solid #ddd;
  }
  
  .Calendar-grid-item:nth-child(-n+7) {
    border-top: 1px solid #ddd;
  }
`