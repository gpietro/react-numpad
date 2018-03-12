import React, { Component } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import styled from 'styled-components';
import moment from 'moment';
import Swipeable from 'react-swipeable';
import MdChevronLeft from 'react-icons/lib/md/chevron-left';
import MdChevronRight from 'react-icons/lib/md/chevron-right';
import { Container, Content, Header, MonthSwitch, MonthLabel, DayGridItem } from './CalendarUI';
import { isMobile } from '../styles/media-templates';

const Days = styled.div`
  display: flex;
  align-items: stretch;
`;

const DayTimes = styled.div`
  flex-grow: 1;
`;

const Day = styled.div`
  background: white;
  display: flex;
  justify-content: center;
`;

const Times = styled.div`
  overflow-y: auto;
  height: 248px;
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
  &:hover {
    ${props =>
      `color: ${props.theme.body.highlightColor}; border-color: ${
        props.theme.body.highlightColor
      }`};
  }
`;

class Appointment extends Component {
  constructor(props) {
    super(props);
    this.state = { date: moment().startOf('day'), dayRange: isMobile() ? 3 : 7 };
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
    this.onChange = this.onChange.bind(this);
    this.handleNextDays = this.handleNextDays.bind(this);
    this.handlePrevDays = this.handlePrevDays.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResizeWindow.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResizeWindow.bind(this));
  }

  onResizeWindow() {
    const dayRange = isMobile() ? 3 : 7;
    if (this.state.dayRange !== dayRange) {
      this.setState({ dayRange });
    }
  }

  onChange(day) {}

  swipingLeft() {}

  swipingRight() {}

  handleNextDays() {
    this.setState(oldState => ({ date: oldState.date.add(oldState.dayRange, 'days') }));
  }

  handlePrevDays() {
    this.setState(oldState => ({ date: oldState.date.subtract(oldState.dayRange, 'days') }));
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
              <MonthSwitch>
                <MdChevronLeft onClick={this.handlePrevDays} />
                <MonthLabel>{date.format('LL')}</MonthLabel>
                <MdChevronRight onClick={this.handleNextDays} />
              </MonthSwitch>
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
                      <Day>{day.format('dd DD')}</Day>
                      <Times>
                        {dates
                          .filter(d =>
                            moment(d, dateFormat)
                              .startOf('day')
                              .isSame(day)
                          )
                          .map(d => (
                            <Time onClick={() => console.log('app', d)} key={`appointment-${d}`}>
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
