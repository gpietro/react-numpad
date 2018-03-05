import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import MdChevronLeft from 'react-icons/lib/md/chevron-left';
import MdChevronRight from 'react-icons/lib/md/chevron-right';
import {
  Header,
  MonthSwitch,
  MonthLabel,
  YearSwitch,
  YearLabel,
  Days,
  WeekDays,
  StyledGridItem,
  DayGridItem,
} from './CalendarUI';

import { VIEWS } from './Calendar';

const GridItem = ({ onClick, day, date, children, disabled, marker }) => (
  <DayGridItem
    active={day.day.isSame(date)}
    onClick={() => onClick(day.day)}
    nextMonth={day.nextMonth}
    prevMonth={day.prevMonth}
    disabled={disabled}
    marker={marker}
  >
    {children}
  </DayGridItem>
);

GridItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  day: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  date: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  marker: PropTypes.bool.isRequired,
};

const createDateObjects = (startOfMonth, weekOffset) => {
  let diff = startOfMonth.isoWeekday() - weekOffset;
  if (diff < 0) diff += 7;

  const prevMonthDays = [];
  for (let i = 0; i < diff; i += 1) {
    prevMonthDays.push({
      day: startOfMonth.clone().subtract(diff - i, 'days'),
      prevMonth: true,
    });
  }

  const currentMonthDays = [];
  for (let i = 1; i < startOfMonth.daysInMonth() + 1; i += 1) {
    currentMonthDays.push({
      day: moment([startOfMonth.year(), startOfMonth.month(), i]),
    });
  }

  const daysAdded = prevMonthDays.length + currentMonthDays.length - 1;

  const nextMonthDays = [];
  let i = 1;
  while (daysAdded + i < 42) {
    nextMonthDays.push({
      day: currentMonthDays[currentMonthDays.length - 1].day.clone().add(i, 'days'),
      nextMonth: true,
    });

    i += 1;
  }

  return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
};

const DayView = ({
  weekOffset,
  locale,
  calendarMonth,
  onChange,
  minDate,
  maxDate,
  dateFormat,
  markers,
  date,
  keyValid,
  handlePrevMonth,
  handleNextMonth,
  handlePrevYear,
  handleNextYear,
  updateCalendarView,
}) => (
  <Fragment>
    <Header>
      <MonthSwitch>
        <MdChevronLeft onClick={handlePrevMonth} />
        <MonthLabel onClick={() => updateCalendarView(VIEWS.MONTH_VIEW)}>
          {calendarMonth.locale(locale).format('MMMM')}
        </MonthLabel>
        <MdChevronRight onClick={handleNextMonth} />
      </MonthSwitch>
      <YearSwitch>
        <MdChevronLeft onClick={handlePrevYear} />
        <YearLabel onClick={() => updateCalendarView(VIEWS.YEAR_VIEW)}>
          {calendarMonth.locale(locale).format('YYYY')}
        </YearLabel>
        <MdChevronRight onClick={handleNextYear} />
      </YearSwitch>
    </Header>
    <WeekDays>
      {Array(7)
        .fill()
        .map((_, i) => i + weekOffset)
        .map(weekDay => (
          <StyledGridItem key={`week-day-${weekDay}`}>
            {moment()
              .isoWeekday(weekDay)
              .locale(locale)
              .format('dd')}
          </StyledGridItem>
        ))}
    </WeekDays>

    <Days>
      {createDateObjects(calendarMonth, weekOffset).map(day => (
        <GridItem
          key={`day-${day.day.format('DD.MM')}`}
          day={day}
          date={date}
          onClick={onChange}
          disabled={!keyValid(day.day, minDate, maxDate, dateFormat)}
          marker={markers.includes(day.day.format(dateFormat))}
        >
          {day.day.format('D')}
        </GridItem>
      ))}
    </Days>
  </Fragment>
);

DayView.propTypes = {
  weekOffset: PropTypes.number.isRequired,
  locale: PropTypes.string.isRequired,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  dateFormat: PropTypes.string.isRequired,
  markers: PropTypes.arrayOf(PropTypes.string).isRequired,
  keyValid: PropTypes.func.isRequired,
  calendarMonth: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  onChange: PropTypes.func.isRequired,
  date: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  handlePrevMonth: PropTypes.func.isRequired,
  handleNextMonth: PropTypes.func.isRequired,
  handlePrevYear: PropTypes.func.isRequired,
  handleNextYear: PropTypes.func.isRequired,
  updateCalendarView: PropTypes.func.isRequired,
};

DayView.defaultProps = {
  minDate: undefined,
  maxDate: undefined,
};

export default DayView;
