export default `
* {
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    padding: 0;
}

.Calendar {
    display: flex;
    flex-direction: column;
    margin: auto;
    min-width: 300px;
    height: 250px;
    max-width: 440px;
    background: #f9f9f9;
}

.Calendar-grid-item {
    &.active {
        font-weight: 700;
        color: white;
        background: #32A5F2;
    }
    flex: 0 14.28571%;
    text-align: center;
    border-right: none;
    border-bottom: 1px solid #ddd;
    padding: 0.25rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-transform: capitalize;
}

.Calendar-days {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    cursor: pointer;  
    flex-grow: 1;
    .Calendar-grid-item:nth-child(-n+7) {
        border-top: 1px solid #ddd;
    }
}

.Calendar-week-days {
    display: flex;    
    width: 100%;
    background: white;

    .Calendar-grid-item {
        padding: 0.2em;
        font-size: 0.8em;
        border: none;
    }
}

.Calendar-header {
    font-size: 1.1em;    
    height: 34px;
    display: flex;
    justify-content: space-between;
    text-transform: capitalize;        
    cursor: pointer;
    align-items: center;
    color: white;
    background: #383D3B;
}

.Calendar-header button {
    width: 50px;
    border: 0;
    background: transparent;
    color: #32A5F2;
    cursor: pointer;
    outline: none;
}

.Calendar-grid-item.nextMonth,
.Calendar-grid-item.prevMonth {
    color: #999;
}
`