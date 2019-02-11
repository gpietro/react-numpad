import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import moment from 'moment';
import Swipeable from 'react-swipeable';
import YearView from './CalendarYearView';
import MonthView from './CalendarMonthView';
import DayView from './CalendarDayView';
import { Container, Content, VIEWS } from './CalendarUI';
import TimeView from './TimeView';

const Calendar = ({
  locale,
  weekOffset,
  keyValid,
  min,
  max,
  dateFormat,
  markers,
  value,
  confirm,
  timeFormat,
}) => {
  useEffect(() => {
    // Moment.js hack to load locales when needed
    if (locale !== 'en') {
      try {
        // eslint-disable-next-line import/no-dynamic-require
        require(`moment/locale/${locale}`); // eslint-disable-line global-require
      } catch (e) {
        console.warn(`Wrong locale ${locale}, ${e.message}`); // eslint-disable-line no-console
      }
    }
  });

  const [preValue, setPreValue] = useState();
  const [date, setDate] = useState(moment().startOf('day'));
  const [calendarMonth, setCalendarMonth] = useState(
    moment()
      .startOf('day')
      .startOf('month')
  );
  const [calendarView, setCalendarView] = useState(VIEWS.DAY_VIEW);

  if (value && value !== preValue) {
    setPreValue(value);
    setDate(moment(value, dateFormat).startOf('day'));
    setCalendarMonth(
      moment(value, dateFormat)
        .startOf('day')
        .startOf('month')
    );
  }

  const onTime = useCallback(
    date => {
      confirm(date.format(`${dateFormat}${timeFormat}`));
    },
    [dateFormat, timeFormat]
  );

  const onChange = useCallback(
    date => {
      if (calendarView === VIEWS.DAY_VIEW && timeFormat) {
        setCalendarView(VIEWS.TIME_VIEW);
        setDate(date.clone());
      } else {
        confirm(date.format(dateFormat));
      }
    },
    [calendarView, date, dateFormat, timeFormat]
  );

  const updateCalendarView = useCallback(view => {
    setCalendarView(view);
  });

  const swipingLeft = useCallback(() => {
    handleNextMonth();
  });

  const swipingRight = useCallback(() => {
    handlePrevMonth();
  });

  const handleNextMonth = useCallback(
    () => {
      setCalendarMonth(
        calendarMonth
          .clone()
          .add(1, 'months')
          .startOf('month')
      );
    },
    [calendarMonth]
  );

  const handlePrevMonth = useCallback(
    () => {
      setCalendarMonth(
        calendarMonth
          .clone()
          .subtract(1, 'months')
          .startOf('month')
      );
    },
    [calendarMonth]
  );

  const handleChangeMonth = useCallback(
    month => {
      setCalendarMonth(
        calendarMonth
          .clone()
          .month(month)
          .startOf('month')
      );
      setCalendarView(VIEWS.DAY_VIEW);
    },
    [calendarMonth]
  );

  const handleBackTime = useCallback(() => {
    setCalendarView(VIEWS.DAY_VIEW);
  });

  const handleNextYear = useCallback(
    () => {
      setCalendarMonth(calendarMonth.clone().add(1, 'year'));
    },
    [calendarMonth]
  );

  const handlePrevYear = useCallback(
    () => {
      setCalendarMonth(calendarMonth.clone().subtract(1, 'year'));
    },
    [calendarMonth]
  );

  const handleChangeYear = useCallback(
    year => {
      setCalendarMonth(calendarMonth.clone().year(year));
      setCalendarView(VIEWS.DAY_VIEW);
    },
    [calendarMonth]
  );

  return (
    <Swipeable onSwipedLeft={swipingLeft} onSwipedRight={swipingRight}>
      <Container>
        <Content>
          {calendarView === VIEWS.DAY_VIEW && (
            <DayView
              handlePrevMonth={handlePrevMonth}
              handleNextMonth={handleNextMonth}
              handlePrevYear={handlePrevYear}
              handleNextYear={handleNextYear}
              updateCalendarView={updateCalendarView}
              weekOffset={weekOffset}
              locale={locale}
              calendarMonth={calendarMonth}
              onChange={onChange}
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
              onChange={onTime}
              date={date}
              handleBackTime={handleBackTime}
            />
          )}
          {calendarView === VIEWS.MONTH_VIEW && (
            <MonthView locale={locale} handleChangeMonth={handleChangeMonth} />
          )}
          {calendarView === VIEWS.YEAR_VIEW && (
            <YearView handleChangeYear={handleChangeYear} date={date} />
          )}
        </Content>
      </Container>
    </Swipeable>
  );
};

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

export default onClickOutside(Calendar, {
  handleClickOutside: instance => evt => {
    const {
      props: { cancel },
    } = instance;
    evt.preventDefault();
    evt.stopPropagation();
    cancel();
  },
});
