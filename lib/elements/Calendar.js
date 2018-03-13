import React, { Component } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import moment from 'moment';
import Swipeable from 'react-swipeable';
import YearView from './CalendarYearView';
import MonthView from './CalendarMonthView';
import DayView from './CalendarDayView';
import { Container, Content } from './CalendarUI';

export const VIEWS = {
  DAY_VIEW: 'DAY_VIEW',
  MONTH_VIEW: 'MONTH_VIEW',
  YEAR_VIEW: 'YEAR_VIEW',
};

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
  }

  onChange(day) {
    const { confirm, dateFormat } = this.props;
    this.setState({ date: day }, () => {
      // TODO: Find a solution to avoid streaming the value
      confirm(this.state.date.format(dateFormat).replace(/\D+/g, ''));
    });
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
    evt.preventDefault();
    evt.stopPropagation();
    this.props.cancel();
  }

  render() {
    const { locale, weekOffset, keyValid, minDate, maxDate, dateFormat, markers } = this.props;
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
                minDate={minDate}
                date={date}
                keyValid={keyValid}
                maxDate={maxDate}
                dateFormat={dateFormat}
                markers={markers}
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
  locale: PropTypes.string.isRequired,
  keyValid: PropTypes.func.isRequired,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  markers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Calendar.defaultProps = {
  weekOffset: 0,
  value: undefined,
  dateFormat: 'MM/DD/YYYY',
  minDate: undefined,
  maxDate: undefined,
};

export default onClickOutside(Calendar);
