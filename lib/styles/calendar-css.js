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
    height: 300px;
    max-width: 595px;
}

.Calendar-grid-item {
    &.active {
        font-weight: 700;
        color: white;
        background: #333;
    }
    flex: 0 14.28571%;
    text-align: center;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding: 0.25rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-transform: capitalize;
    background: white;
}

.Calendar-days {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    cursor: pointer;  
    flex-grow: 1;    
}

.Calendar-week-days {
    display: flex;    
    width: 100%;

    .Calendar-grid-item {
        padding: 0.2em;
        font-size: 0.8em;
        background: #efefef;
        border-bottom: none;
    }
}

.Calendar-header {
    font-size: 1.1em;    
    height: 34px;
    background: #333;
    color: #fff;
    display: flex;
    justify-content: space-between;
    text-transform: capitalize;        
    cursor: pointer;
    align-items: center;
}

.Calendar-header button {
    width: 50px;
    border: 0;
    background: transparent;
    color: white;
    cursor: pointer;
    outline: none;
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