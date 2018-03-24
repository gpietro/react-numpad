import React, { Component } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import styled from 'styled-components';
import moment from 'moment';
import Swipeable from 'react-swipeable';
import Color from 'color';
import MdChevronLeft from 'react-icons/lib/md/chevron-left';
import MdChevronRight from 'react-icons/lib/md/chevron-right';
import { Container, Content, Header, MonthSwitch, MonthLabel } from './CalendarUI';
import { NButton } from './ui';
import { isMobile } from '../styles/media-templates';

const Days = styled.div`
  display: flex;
  flex-grow: 1;
  flex-basis: 0;
`;

const DayTimes = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: 0;
`;

const Day = styled.div`
  display: flex;
  background: white;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4px 0;
  text-transform: capitalize;
  line-height: 1;
  .number {
    font-size: 1.2em;
  }
  .name {
    font-size: 0.8em;
  }
`;

const Times = styled.div`
  overflow-y: auto;
  flex: 1;
`;

const Time = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  padding: 0.5em;
  border-bottom: 1px solid #fff;
  :nth-child(-n + 7) {
    border-top: '1px solid #ddd';
  }
  &:active {
    ${props =>
      `color: ${props.theme.body.highlightColor}; border-color: ${
        props.theme.body.highlightColor
      }`};
  }
`;

class Appointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().startOf('day'),
      dayRange: isMobile() ? 3 : 7,
    };
    // Moment.js hack to load locales when needed
    if (props.locale !== 'en') {
      try {
        // eslint-disable-next-line import/no-dynamic-require
        require(`moment/locale/${props.locale}`); // eslint-disable-line global-require
      } catch (e) {
        console.warn(`Wrong locale ${props.locale}, ${e.message}`); // eslint-disable-line no-console
      }
    }
    this.swipingLeft = this.swipingLeft.bind(this);
    this.swipingRight = this.swipingRight.bind(this);
    this.handleNextDays = this.handleNextDays.bind(this);
    this.handlePrevDays = this.handlePrevDays.bind(this);
  }

  componentDidMount() {
    if (document.body) {
      document.body.style.overflow = 'hidden'; // Prevents background scrolling
    }
    window.addEventListener('resize', this.onResizeWindow.bind(this));
  }

  componentWillUnmount() {
    if (document.body) {
      document.body.style.overflow = ''; // Reenables background scrolling
    }
    window.removeEventListener('resize', this.onResizeWindow.bind(this));
  }

  onResizeWindow() {
    const dayRange = isMobile() ? 3 : 7;
    if (this.state.dayRange !== dayRange) {
      this.setState({ dayRange });
    }
  }

  swipingLeft() {
    this.handleNextDays();
  }

  swipingRight() {
    this.handlePrevDays();
  }

  handleNextDays() {
    this.setState(oldState => ({
      date: oldState.date.add(oldState.dayRange, 'days'),
    }));
  }

  handlePrevDays() {
    const { date, dayRange } = this.state;
    const prevDate = date.clone().subtract(dayRange, 'days');
    if (prevDate.isBefore(moment())) {
      this.setState({ date: moment().startOf('day') });
    } else {
      this.setState(oldState => ({
        date: prevDate,
      }));
    }
  }

  handleClickOutside(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.props.cancel();
  }

  render() {
    const { locale, dateFormat, dates } = this.props;
    const { date } = this.state;

    return (
      <Swipeable onSwipedLeft={this.swipingLeft} onSwipedRight={this.swipingRight}>
        <Container>
          <Content>
            <Header>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                <NButton onClick={this.handlePrevDays} disabled={!date.isAfter(moment())}>
                  <MdChevronLeft />
                </NButton>
                <div
                  style={{
                    display: 'flex',
                    flexGrow: 1,
                    justifyContent: 'center',
                  }}
                >
                  {date.locale(locale).format('MMMM Y')}
                </div>
                <NButton onClick={this.handleNextDays}>
                  <MdChevronRight />
                </NButton>
              </div>
            </Header>
            <Days>
              {Array(this.state.dayRange)
                .fill()
                .map((_, i) => i)
                .map(weekDay => {
                  const day = date
                    .clone()
                    .add(weekDay, 'days')
                    .startOf('day')
                    .locale(locale);
                  return (
                    <DayTimes key={`appointment-day-${weekDay}`}>
                      <Day>
                        <div className="number">{day.format('DD')}</div>
                        <div className="name">{day.format('ddd')}</div>
                      </Day>
                      <Times>
                        {dates
                          .filter(d =>
                            moment(d, dateFormat)
                              .startOf('day')
                              .isSame(day)
                          )
                          .map(d => (
                            <Time
                              onClick={() => {
                                console.log('d', d);
                                this.props.confirm(d);
                              }}
                              key={`appointment-${d}`}
                            >
                              {d.split(' ')[1]}
                            </Time>
                          ))}
                      </Times>
                    </DayTimes>
                  );
                })}
            </Days>
          </Content>
        </Container>
      </Swipeable>
    );
  }
}

Appointment.propTypes = {
  confirm: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  value: PropTypes.string,
  dateFormat: PropTypes.string,
  locale: PropTypes.string.isRequired,
  dates: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Appointment.defaultProps = {
  value: undefined,
  dateFormat: 'MM/DD/YYYY',
};

export default onClickOutside(Appointment);
