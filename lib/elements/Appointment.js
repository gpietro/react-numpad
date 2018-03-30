import React, { Component } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import styled from 'styled-components';
import moment from 'moment';
import Swipeable from 'react-swipeable';
import chunk from 'lodash/chunk';
import MdChevronLeft from 'react-icons/lib/md/chevron-left';
import MdChevronRight from 'react-icons/lib/md/chevron-right';
import { Container, Content, Header } from './CalendarUI';
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
      dayRange: isMobile() ? 4 : 7,
      index: 0,
      orderedDates: Object.keys(props.dates).sort(
        (a, b) => moment(a, props.dateFormat) - moment(b, props.dateFormat)
      ),
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
      document.body.style.overflow = 'hidden';
    }
    window.addEventListener('resize', this.onResizeWindow.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dates !== this.props.dates) {
      const { dateFormat } = nextProps;
      this.setState({
        orderedDates: Object.keys(nextProps.dates).sort(
          (a, b) => moment(a, dateFormat) - moment(b, dateFormat)
        ),
      });
    }
  }

  componentWillUnmount() {
    if (document.body) {
      document.body.style.overflow = '';
    }
    window.removeEventListener('resize', this.onResizeWindow.bind(this));
  }

  onResizeWindow() {
    const dayRange = isMobile() ? 4 : 7;
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
    this.setState(oldState => ({ index: oldState.index + 1 }));
  }

  handlePrevDays() {
    this.setState(oldState => ({ index: Math.max(oldState.index - 1, 0) }));
  }

  handleClickOutside(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.props.cancel();
  }

  render() {
    const { locale, dateFormat, dates } = this.props;
    const { dayRange, index, orderedDates } = this.state;
    const chunkDates = chunk(orderedDates, dayRange);
    const firstDayMonth = moment(chunkDates[index][0], dateFormat)
      .locale(locale)
      .format('MMMM Y');
    const lastDayMonth = moment(chunkDates[index][chunkDates[index].length - 1], dateFormat)
      .locale(locale)
      .format('MMMM Y');
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
                <NButton onClick={this.handlePrevDays} disabled={index === 0}>
                  <MdChevronLeft />
                </NButton>
                <div
                  style={{
                    display: 'flex',
                    flexGrow: 1,
                    justifyContent: 'center',
                  }}
                >
                  {firstDayMonth === lastDayMonth
                    ? firstDayMonth
                    : `${firstDayMonth} - ${lastDayMonth}`}
                </div>
                <NButton onClick={this.handleNextDays} disabled={!chunkDates[index + 1]}>
                  <MdChevronRight />
                </NButton>
              </div>
            </Header>
            <Days>
              {chunkDates[index].map(day => (
                <DayTimes key={`appointment-day-${day}`}>
                  <Day>
                    <div className="number">{moment(day, dateFormat).format('DD')}</div>
                    <div className="name">{moment(day, dateFormat).format('ddd')}</div>
                  </Day>
                  <Times>
                    {dates[day].map(time => (
                      <Time
                        onClick={() => {
                          this.props.confirm(`${day} ${time}`);
                        }}
                        key={`appointment-${day} ${time}`}
                      >
                        {time}
                      </Time>
                    ))}
                  </Times>
                </DayTimes>
              ))}
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
  dateFormat: PropTypes.string,
  locale: PropTypes.string.isRequired,
  dates: PropTypes.objectOf(PropTypes.array).isRequired,
};

Appointment.defaultProps = {
  dateFormat: 'MM/DD/YYYY',
};

export default onClickOutside(Appointment);
