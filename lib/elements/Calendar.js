import React, { Component } from 'react'
import PropTypes from 'prop-types'
import onClickOutside from 'react-onclickoutside'
import moment from 'moment'
import Swipeable from 'react-swipeable'

const createDateObjects = (startOfMonth, weekOffset = 0) => {
    let diff = startOfMonth.weekday() - weekOffset;
    if (diff < 0) diff += 7;

    const prevMonthDays = [];
    for (let i = 0; i < diff; i++) {
        prevMonthDays.push({
            day: startOfMonth.clone().subtract(diff - i, 'days'),
            classNames: 'prevMonth'
        });
    }

    const currentMonthDays = [];
    for (let i = 1; i < startOfMonth.daysInMonth() + 1; i++) {
        currentMonthDays.push({
            day: moment([startOfMonth.year(), startOfMonth.month(), i])
        });
    }

    const daysAdded = prevMonthDays.length + currentMonthDays.length - 1;

    const nextMonthDays = [];
    let i = 1;
    while ((daysAdded + i) < 42) {
        nextMonthDays.push({
            day: currentMonthDays[currentMonthDays.length - 1].day
                .clone()
                .add(i, 'days'),
            classNames: 'nextMonth'
        });

        i += 1;
    }

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
}

class Calendar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: props.currentDate.clone().startOf('day'),
            calendarMonth: props.currentDate.clone().startOf('month') 
        }
        this.handleNextMonth = this.handleNextMonth.bind(this)
        this.handlePrevMonth = this.handlePrevMonth.bind(this)
        this.handleNextYear = this.handleNextYear.bind(this)
        this.handlePrevYear = this.handlePrevYear.bind(this)
        this.swipingLeft = this.swipingLeft.bind(this)
        this.swipingRight = this.swipingRight.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    handleClickOutside(evt) {
        evt.preventDefault()
        evt.stopPropagation()
        this.onChange(this.state.date)
    }

    swipingLeft() {
        this.handlePrevMonth()
    }

    swipingRight() {
        this.handleNextMonth()
    }

    handleNextMonth() {
        this.setState((oldState) => ({calendarMonth: oldState.calendarMonth.add(1, 'months').startOf('month')}))
    }

    handlePrevMonth() {
        this.setState((oldState) => ({calendarMonth: oldState.calendarMonth.subtract(1, 'months').startOf('month')}))
    }

    handleNextYear() {
        this.setState((oldState) => ({calendarMonth: oldState.date.add(1, 'year')}))
    }

    handlePrevYear() {
        this.setState((oldState) => ({calendarMonth: oldState.date.subtract(1, 'year')}))
    }

    onChange(day) {
        let {hideCalendar, dateFormat} = this.props
        this.setState({date: moment(day)}, () => hideCalendar(this.state.date.format(dateFormat)))
    }

    render() {
        let { locale, weekOffset } = this.props
        let { date, calendarMonth } = this.state
        
        return (
            <Swipeable
                onSwipedLeft={this.swipingLeft}
                onSwipedRight={this.swipingRight}>
                <div className="Calendar">
                    <div className="Calendar-header">
                        <div style={{display: 'flex', justifyContent: 'space-between', width: '156px'}}>
                            <button onClick={this.handlePrevMonth}><span className="fa fa-chevron-left" /></button>
                            {calendarMonth.locale(locale).format('MMMM')}
                            <button onClick={this.handleNextMonth}><span className="fa fa-chevron-right" /></button>
                        </div>
                        
                        <div>
                            <button onClick={this.handlePrevYear}><span className="fa fa-chevron-left" /></button>
                            {calendarMonth.locale(locale).format('YYYY')}
                            <button onClick={this.handleNextYear}><span className="fa fa-chevron-right" /></button>
                        </div>
                    </div>
                    <div className="Calendar-week-days">
                        { Array(7).fill().map((_, i) => i+1+weekOffset).map(weekDay => (
                            <div key={`week-day-${weekDay}`} className="Calendar-grid-item">
                                {moment().isoWeekday(weekDay).locale(locale).format('dd')}
                            </div>
                        )) }
                    </div>
                    <div className="Calendar-days">
                        {createDateObjects(calendarMonth, weekOffset).map((day, i) => (
                            <div 
                                key={`day-${i}`}
                                className={`Calendar-grid-item ${day.classNames || ''} ${day.day.isSame(date) ? 'active' : ''}`}
                                onClick={() => this.onChange(day.day)}>
                                {day.day.format('D')}
                            </div>
                        ))}
                    </div>
                </div>
            </Swipeable>
        );
    }
}

Calendar.propTypes = {
    weekOffset: PropTypes.number.isRequired,
    currentDate: PropTypes.object.isRequired,
    hideCalendar: PropTypes.func.isRequired,
    dateFormat: PropTypes.string,
    locale: PropTypes.string
};

Calendar.defaultProps = {
    weekOffset: 0,
    currentDate: moment(),
    dateFormat: 'DD.MM.YYYY',
    locale: 'en',
    hideCalendar: () => {console.warn('Calendar callback undefined')}
};

export default onClickOutside(Calendar)