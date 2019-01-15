import React, { Component } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import styled from 'styled-components';
import moment from 'moment';
import Swipeable from 'react-swipeable';
import chunk from 'lodash/chunk';
import MdChevronLeft from 'react-icons/lib/md/chevron-left';
import MdChevronRight from 'react-icons/lib/md/chevron-right';
import MdCancel from 'react-icons/lib/md/cancel';
import { Container, Header } from './CalendarUI';
import Content from './AppointmentUI';
import NButton from './ui';
import { isMobile } from '../styles/media-templates';

const AppointmentHeader = styled(Header)`
  display: flex;
  align-items: center;
`;

const HeaderMonth = styled.div`
  display: flex;
  font-size: 0.8em;
  padding: 2px 0;
  justify-content: center;
  flex-grow: ${props => props.widthHeader};
  flex-basis: 0;
  background: ${props => props.theme.header.backgroundColor};
  color: white;
  border-top: 2px solid white;
  text-transform: uppercase;
`;

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
  ${props =>
    props.separator ? `border-left: 2px solid ${props.theme.header.backgroundColor}` : ''};
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
    const { dates } = this.props;
    if (nextProps.dates !== dates) {
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
    const { dayRange } = this.state;
    const testDayRange = isMobile() ? 4 : 7;
    if (dayRange !== testDayRange) {
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
    const { orderedDates, dayRange } = this.state;
    this.setState(oldState => ({
      index: Math.min(oldState.index + 1, Math.floor(orderedDates.length / dayRange)),
    }));
  }

  handlePrevDays() {
    this.setState(oldState => ({ index: Math.max(oldState.index - 1, 0) }));
  }

  handleClickOutside(evt) {
    const { cancel } = this.props;
    evt.preventDefault();
    evt.stopPropagation();
    cancel();
  }

  render() {
    const { dateFormat, dates, cancel, confirm } = this.props;
    const { dayRange, index, orderedDates } = this.state;
    const chunkDates = chunk(orderedDates, dayRange);
    const headerMonths = {};
    chunkDates[index].forEach(date => {
      const month = moment(date, dateFormat).format('MMMM');
      if (month in headerMonths) {
        headerMonths[month] += 1;
      } else {
        headerMonths[month] = 1;
      }
    });

    let isOdd;

    return (
      <Swipeable onSwipedLeft={this.swipingLeft} onSwipedRight={this.swipingRight}>
        <Container>
          <Content>
            <AppointmentHeader>
              <NButton onClick={this.handlePrevDays} disabled={index === 0}>
                <MdChevronLeft />
              </NButton>
              <NButton onClick={cancel} style={{ fontSize: '1em' }}>
                <MdCancel />
              </NButton>
              <NButton onClick={this.handleNextDays} disabled={!chunkDates[index + 1]}>
                <MdChevronRight />
              </NButton>
            </AppointmentHeader>
            <div style={{ display: 'flex' }}>
              {Object.keys(headerMonths).map(month => (
                <HeaderMonth key={month} widthHeader={headerMonths[month]}>
                  {month}
                </HeaderMonth>
              ))}
            </div>
            <Days>
              {chunkDates[index].map((day, nDay) => {
                let separator = false;
                if (!nDay) {
                  isOdd = moment(day, dateFormat).format('MM') % 2;
                } else if (isOdd !== moment(day, dateFormat).format('MM') % 2) {
                  separator = true;
                  isOdd = moment(day, dateFormat).format('MM') % 2;
                }
                return (
                  <DayTimes key={`appointment-day-${day}`} separator={separator}>
                    <Day isOdd={moment(day, dateFormat).format('MM') % 2}>
                      <div className="number">{moment(day, dateFormat).format('DD')}</div>
                      <div className="name">{moment(day, dateFormat).format('ddd')}</div>
                    </Day>
                    <Times>
                      {dates[day].map(time => (
                        <Time
                          onClick={() => {
                            confirm(`${day} ${time}`);
                          }}
                          key={`appointment-${day} ${time}`}
                        >
                          {time}
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
  dateFormat: PropTypes.string,
  locale: PropTypes.string.isRequired,
  dates: PropTypes.objectOf(PropTypes.array).isRequired,
};

Appointment.defaultProps = {
  dateFormat: 'MM/DD/YYYY',
};

export default onClickOutside(Appointment);
