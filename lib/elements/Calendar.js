import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import moment from 'moment';
import Swipeable from 'react-swipeable';
import YearView from './CalendarYearView';
import MonthView from './CalendarMonthView';
import DayView from './CalendarDayView';
import { Container, Content, VIEWS } from './CalendarUI';
import TimeView from './TimeView';

class Calendar extends Component {
  constructor(props) {
    super(props);
    // Moment.js hack to load locales when needed
    if (props.locale !== 'en') {
      try {
        // eslint-disable-next-line import/no-dynamic-require
        require(`moment/locale/${props.locale}`); // eslint-disable-line global-require
      } catch (e) {
        console.warn(`Wrong locale ${props.locale}, ${e.message}`); // eslint-disable-line no-console
      }
    }
    this.currentDate = props.value
      ? moment(props.value, props.dateFormat).startOf('day')
      : moment().startOf('day');
    this.state = {
      date: this.currentDate.clone().startOf('day'),
      calendarMonth: this.currentDate.clone().startOf('month'),
      calendarView: VIEWS.DAY_VIEW,
    };
    this.handleNextMonth = this.handleNextMonth.bind(this);
    this.handlePrevMonth = this.handlePrevMonth.bind(this);
    this.handleChangeMonth = this.handleChangeMonth.bind(this);
    this.handleNextYear = this.handleNextYear.bind(this);
    this.handlePrevYear = this.handlePrevYear.bind(this);
    this.handleChangeYear = this.handleChangeYear.bind(this);
    this.updateCalendarView = this.updateCalendarView.bind(this);
    this.swipingLeft = this.swipingLeft.bind(this);
    this.swipingRight = this.swipingRight.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onTime = this.onTime.bind(this);
    this.handleBackTime = this.handleBackTime.bind(this);
  }

  onTime(date) {
    const { confirm, dateFormat, timeFormat } = this.props;
    confirm(date.format(`${dateFormat}${timeFormat}`));
  }

  onChange(date) {
    const { confirm, dateFormat, timeFormat } = this.props;
    const { calendarView } = this.state;
    if (calendarView === VIEWS.DAY_VIEW && timeFormat) {
      this.setState({ calendarView: VIEWS.TIME_VIEW, date: date.clone() });
    } else {
      confirm(date.format(dateFormat));
    }
  }

  updateCalendarView(view) {
    this.setState({ calendarView: view });
  }

  swipingLeft() {
    this.handleNextMonth();
  }

  swipingRight() {
    this.handlePrevMonth();
  }

  handleNextMonth() {
    this.setState(oldState => ({
      calendarMonth: oldState.calendarMonth
        .clone()
        .add(1, 'months')
        .startOf('month'),
    }));
  }

  handlePrevMonth() {
    this.setState(oldState => ({
      calendarMonth: oldState.calendarMonth
        .clone()
        .subtract(1, 'months')
        .startOf('month'),
    }));
  }

  handleChangeMonth(month) {
    this.setState(oldState => ({
      calendarMonth: oldState.calendarMonth
        .clone()
        .month(month)
        .startOf('month'),
      calendarView: VIEWS.DAY_VIEW,
    }));
  }

  handleBackTime() {
    this.setState({
      calendarView: VIEWS.DAY_VIEW,
    });
  }

  handleNextYear() {
    this.setState(oldState => ({
      calendarMonth: oldState.calendarMonth.clone().add(1, 'year'),
    }));
  }

  handlePrevYear() {
    this.setState(oldState => ({
      calendarMonth: oldState.calendarMonth.clone().subtract(1, 'year'),
    }));
  }

  handleChangeYear(year) {
    this.setState(oldState => ({
      calendarMonth: oldState.calendarMonth.clone().year(year),
      calendarView: VIEWS.DAY_VIEW,
    }));
  }

  handleClickOutside(evt) {
    const { cancel } = this.props;
    evt.preventDefault();
    evt.stopPropagation();
    cancel();
  }

  render() {
    const { locale, weekOffset, keyValid, min, max, dateFormat, markers } = this.props;
    const { date, calendarMonth, calendarView } = this.state;

    return (
      <Swipeable onSwipedLeft={this.swipingLeft} onSwipedRight={this.swipingRight}>
        <Container>
          <Content>
            {calendarView === VIEWS.DAY_VIEW && (
              <DayView
                handlePrevMonth={this.handlePrevMonth}
                handleNextMonth={this.handleNextMonth}
                handlePrevYear={this.handlePrevYear}
                handleNextYear={this.handleNextYear}
                updateCalendarView={this.updateCalendarView}
                weekOffset={weekOffset}
                locale={locale}
                calendarMonth={calendarMonth}
                onChange={this.onChange}
                min={min}
                date={date}
                keyValid={keyValid}
                max={max}
                dateFormat={dateFormat}
                markers={markers}
              />
            )}
            {calendarView === VIEWS.TIME_VIEW && (
              <TimeView
                locale={locale}
                onChange={this.onTime}
                date={date.format()}
                handleBackTime={this.handleBackTime}
              />
            )}
            {calendarView === VIEWS.MONTH_VIEW && (
              <MonthView locale={locale} handleChangeMonth={this.handleChangeMonth} />
            )}
            {calendarView === VIEWS.YEAR_VIEW && (
              <YearView handleChangeYear={this.handleChangeYear} date={date} />
            )}
          </Content>
        </Container>
      </Swipeable>
    );
  }
}

Calendar.propTypes = {
  confirm: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  weekOffset: PropTypes.number,
  value: PropTypes.string,
  dateFormat: PropTypes.string,
  timeFormat: PropTypes.string,
  locale: PropTypes.string.isRequired,
  keyValid: PropTypes.func.isRequired,
  min: PropTypes.string,
  max: PropTypes.string,
  markers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Calendar.defaultProps = {
  weekOffset: 0,
  value: undefined,
  dateFormat: 'MM/DD/YYYY',
  timeFormat: undefined,
  min: undefined,
  max: undefined,
};

export default onClickOutside(Calendar);
