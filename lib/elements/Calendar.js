import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const createDateObjects = (date, weekOffset = 0) => {
    const startOfMonth = date.startOf('month');

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
    for (let i = 1; i < date.daysInMonth() + 1; i++) {
        currentMonthDays.push({
            day: moment([date.year(), date.month(), i])
        });
    }

    const daysAdded = prevMonthDays.length + currentMonthDays.length - 1;

    const nextMonthDays = [];
    let i = 1;
    while ((daysAdded + i) % 7 !== 0) {
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
        this.handleNextMonth = this.handleNextMonth.bind(this)
        this.handlePrevMonth = this.handlePrevMonth.bind(this)
    }

    handleNextMonth() {
        if (this.props.onNextMonth) {
            return this.props.onNextMonth();
        }

        this.props.onChangeMonth(this.props.date.clone().add(1, 'months'));
    }

    handlePrevMonth() {
        if (this.props.onPrevMonth) {
            return this.props.onPrevMonth();
        }

        this.props.onChangeMonth(this.props.date.clone().subtract(1, 'months'));
    };

    render() {
        const {
            date,
            weekOffset,
            renderDay,
            onNextMonth,
            onPrevMonth,
            onPickDate,
            onChange
        } = this.props;

        return (
        <div className="Calendar">
            <div className="Calendar-header">
            <button onClick={this.handlePrevMonth}>«</button>
            <div className="Calendar-header-currentDate">
                {date.format('MMMM YYYY')}
            </div>
            <button onClick={this.handleNextMonth}>»</button>
            </div>
            <div className="Calendar-grid">
            {createDateObjects(date, weekOffset).map((day, i) => (
                <div
                key={`day-${i}`}
                className={`Calendar-grid-item ${day.classNames || ''}`}
                onClick={e => onPickDate(day.day)}
                >
                {renderDay(day.day)}
                </div>
            ))}
            </div>
        </div>
        );
    }
}

Calendar.propTypes = {
    /** Week offset*/
    weekOffset: PropTypes.number.isRequired,
    /** The current date as a moment objecct */
    date: PropTypes.object.isRequired,
    /** Function to render a day cell */
    renderDay: PropTypes.func,
    /** Called on next month click */
    onNextMonth: PropTypes.func,
    /** Called on prev month click */
    onPrevMonth: PropTypes.func,
    /** Called when some of the navigation controls are clicked */
    onChangeMonth: PropTypes.func,
    /** Called when a date is clicked */
    onPickDate: PropTypes.func
};

Calendar.defaultProps = {
    weekOffset: 0,
    renderDay: day => day.format('YYYY-MM-D')
};

export default Calendar