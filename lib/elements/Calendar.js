import React, { Component } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import styled from 'styled-components';
import moment from 'moment';
import Swipeable from 'react-swipeable';
import Color from 'color';
import MdChevronLeft from 'react-icons/lib/md/chevron-left';
import MdChevronRight from 'react-icons/lib/md/chevron-right';

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

const Container = styled.div`
  user-select: none;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  height: 250px;
  min-width: 340px;
  max-width: ${props => (props.theme.coords ? '340px' : '440px')};
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 45px, rgba(0, 0, 0, 0.22) 0px 10px 18px;
  background: ${props => props.theme.body.backgroundColor};
`;

const Header = styled.div`
  height: 34px;
  display: flex;
  justify-content: space-between;
  text-transform: capitalize;
  color: white;
  background: ${props => props.theme.header.backgroundColor};
  svg:hover {
    fill: #ffc107;
  }
  svg {
    width: 1.5em;
    height: 1.5em;
  }
`;

const MonthSwitch = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MonthLabel = styled.div`
  min-width: 83px;
  text-align: center;
`;

const YearSwitch = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const YearLabel = styled.div`
  min-width: 40px;
  text-align: center;
`;

const Days = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  flex-grow: 1;
`;

const WeekDays = styled.div`
  display: flex;
  width: 100%;
  background: white;
`;

const StyledGridItem = styled.div`
  flex-grow: 1;
  width: calc(100% * (1/7) - 1px - 0.5rem);
  text-align: center;
  border-right: none;
  border-bottom: 1px solid #fff;
  padding: 0.25rem;
  ${WeekDays} & {
    border: none;
    padding: 0.2em;
    font-size: 0.8em;
    :nth-child(-n + 7) {
      border-top: none;
    }
  }
  :nth-child(-n + 7) {
    border-top: '1px solid #ddd';
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-transform: capitalize;
`;

const GridItemLink = StyledGridItem.withComponent('a');
const DayGridItem = GridItemLink.extend`
  ${props =>
    props.prevMonth || props.nextMonth
      ? `color: ${Color(props.theme.body.primaryColor)
          .alpha(0.8)
          .string()};`
      : `color: ${props.theme.body.primaryColor};`} text-decoration: none !important;
  cursor: pointer;
  &:hover {
    ${props =>
      props.active
        ? ''
        : `color: ${props.theme.body.highlightColor}; border-color: ${
            props.theme.body.highlightColor
          }`};
  }
  ${props =>
    props.active
      ? `
        font-weight: 700;
        border-color: ${props.theme.body.primaryColor};
        `
      : ``} &[disabled] {
    color: ${props =>
      Color(props.theme.body.primaryColor)
        .alpha(0.5)
        .string()} !important;
    pointer-events: none;
    cursor: not-allowed;
  }
  position: relative;
  ${props =>
    props.marker
      ? `
    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      padding: 0;
      border-color: transparent;
      border-style: solid;
    }

    &::after {
      border-width: 0.5em;
      border-right-color: ${props.theme.body.highlightColor};
      border-top-color: ${props.theme.body.highlightColor};
    }`
      : ``};
`;

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.currentDate = props.value
      ? moment(props.value, props.dateFormat).startOf('day')
      : moment().startOf('day');
    this.state = {
      date: this.currentDate.clone().startOf('day'),
      calendarMonth: this.currentDate.clone().startOf('month'),
    };
    this.handleNextMonth = this.handleNextMonth.bind(this);
    this.handlePrevMonth = this.handlePrevMonth.bind(this);
    this.handleNextYear = this.handleNextYear.bind(this);
    this.handlePrevYear = this.handlePrevYear.bind(this);
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

  swipingLeft() {
    this.handlePrevMonth();
  }

  swipingRight() {
    this.handleNextMonth();
  }

  handleNextMonth() {
    this.setState(oldState => ({
      calendarMonth: oldState.calendarMonth.add(1, 'months').startOf('month'),
    }));
  }

  handlePrevMonth() {
    this.setState(oldState => ({
      calendarMonth: oldState.calendarMonth.subtract(1, 'months').startOf('month'),
    }));
  }

  handleNextYear() {
    this.setState(oldState => ({
      calendarMonth: oldState.calendarMonth.add(1, 'year'),
    }));
  }

  handlePrevYear() {
    this.setState(oldState => ({
      calendarMonth: oldState.calendarMonth.subtract(1, 'year'),
    }));
  }

  handleClickOutside(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.props.cancel();
  }

  render() {
    const { locale, weekOffset, keyValid, minDate, maxDate, dateFormat, markers } = this.props;
    const { date, calendarMonth } = this.state;

    return (
      <Swipeable onSwipedLeft={this.swipingLeft} onSwipedRight={this.swipingRight}>
        <Container>
          <Content>
            <Header>
              <MonthSwitch>
                <MdChevronLeft onClick={this.handlePrevMonth} />
                <MonthLabel>{calendarMonth.locale(locale).format('MMMM')}</MonthLabel>
                <MdChevronRight onClick={this.handleNextMonth} />
              </MonthSwitch>
              <YearSwitch>
                <MdChevronLeft onClick={this.handlePrevYear} />
                <YearLabel>{calendarMonth.locale(locale).format('YYYY')}</YearLabel>
                <MdChevronRight onClick={this.handleNextYear} />
              </YearSwitch>
            </Header>
            <WeekDays>
              {Array(7)
                .fill()
                .map((_, i) => i + weekOffset)
                .map(weekDay => (
                  <StyledGridItem key={`week-day-${weekDay}`} weekDays>
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
                  onClick={this.onChange}
                  disabled={!keyValid(day.day, minDate, maxDate, dateFormat)}
                  marker={markers.includes(day.day.format(dateFormat))}
                >
                  {day.day.format('D')}
                </GridItem>
              ))}
            </Days>
          </Content>
        </Container>
      </Swipeable>
    );
  }
}

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
