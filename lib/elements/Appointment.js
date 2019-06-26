import React, { useEffect, useState, useMemo, forwardRef } from 'react';
import PropTypes from 'prop-types';
import useOnClickOutside from 'use-onclickoutside';
import styled from 'styled-components';
import moment from 'moment';
import { Swipeable } from 'react-swipeable';
import chunk from 'lodash.chunk';
import isEqual from 'lodash.isequal';
import IconChevronLeft from '@material-ui/icons/ChevronLeftSharp';
import IconChevronRight from '@material-ui/icons/ChevronRightSharp';
import IconClose from '@material-ui/icons/CloseSharp';
import { Container, Header } from './CalendarUI';
import Content from './AppointmentUI';
import AppointmentMonthHeader from './AppointmentMonthHeader';
import NButton from './ui';
import { isMobile } from '../styles/media-templates';
import Days from './ui/Days';
import DayTimes from './ui/DayTimes';
import Day from './ui/Day';
import Times from './ui/Times';
import Time from './ui/Time';

const AppointmentHeader = styled(Header)`
  display: flex;
  align-items: center;
`;

const Appointment = forwardRef(function Appointment(
  { dates, dateFormat, locale, confirm, cancel },
  ref
) {
  const [dayRange, setDayRange] = useState(isMobile() ? 4 : 7);
  const [index, setIndex] = useState(0);
  const [orderedDates, setOrderedDates] = useState();
  const [prevProps, setPrevProps] = useState();
  useOnClickOutside(ref, cancel);

  useEffect(() => {
    // TODO: create a custom hook useMomentLocale
    // Moment.js hack to load locales when needed
    if (locale !== 'en') {
      try {
        // eslint-disable-next-line import/no-dynamic-require
        require(`moment/locale/${locale}`); // eslint-disable-line global-require
      } catch (e) {
        console.warn(`Wrong locale ${locale}, ${e.message}`); // eslint-disable-line no-console
      }
    }

    const onResizeWindow = () => {
      setDayRange(isMobile() ? 4 : 7);
    };

    if (document.body) {
      document.body.style.overflow = 'hidden';
    }
    window.addEventListener('resize', onResizeWindow);

    // Specify how to clean up after this effect:
    return function cleanup() {
      if (document.body) {
        document.body.style.overflow = '';
      }
      window.removeEventListener('resize', onResizeWindow);
    };
  });

  if (!isEqual(prevProps, dates)) {
    setPrevProps(dates);
    setOrderedDates(
      Object.keys(dates).sort((a, b) => moment(a, dateFormat) - moment(b, dateFormat))
    );
  }

  const handleNextDays = () => {
    setIndex(Math.min(index + 1, Math.floor(orderedDates.length / dayRange)));
  };

  const handlePrevDays = () => {
    setIndex(Math.max(index - 1, 0));
  };

  const getChunkDates = useMemo(() => chunk(orderedDates, dayRange), [orderedDates, dayRange]);

  let isOdd;

  return (
    <Swipeable onSwipedLeft={handleNextDays} onSwipedRight={handlePrevDays}>
      <Container>
        <Content ref={ref} square>
          <AppointmentHeader>
            <NButton onClick={handlePrevDays} disabled={index === 0}>
              <IconChevronLeft />
            </NButton>
            <NButton onClick={cancel}>
              <IconClose />
            </NButton>
            <NButton onClick={handleNextDays} disabled={!getChunkDates[index + 1]}>
              <IconChevronRight />
            </NButton>
          </AppointmentHeader>
          <AppointmentMonthHeader
            chunkDates={getChunkDates}
            index={index}
            dateFormat={dateFormat}
          />
          <Days>
            {(getChunkDates[index] || []).map((day, nDay) => {
              let separator = false;
              if (!nDay) {
                isOdd = moment(day, dateFormat).format('MM') % 2;
              } else if (isOdd !== moment(day, dateFormat).format('MM') % 2) {
                separator = true;
                isOdd = moment(day, dateFormat).format('MM') % 2;
              }
              return (
                <DayTimes key={`appointment-day-${day}`} separator={separator}>
                  <Day isOdd={isOdd}>
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
});

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

export default Appointment;
