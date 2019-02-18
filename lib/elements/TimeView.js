import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import MdChevronLeft from 'react-icons/lib/md/chevron-left';
import NButton from './ui';
import { Header } from './CalendarUI';

const TimeTable = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template: repeat(8, 1fr) / repeat(3, 1fr);
  height: 100%;
`;

const Hour = styled.div`
  cursor: pointer;
  border-width: 0 0 1px 0;
  border-style: solid;
  border-color: white;
  text-align: center;
  padding: 5px;
  &:hover {
    color: ${props => props.theme.body.highlightColor};
    border-color: ${props => props.theme.body.highlightColor};
  }
`;

function* intervalIterator(date, minutes) {
  const current = date.clone().startOf('day');
  const end = date.clone().endOf('day');
  while (current.isBefore(end)) {
    yield current.clone();
    current.add(minutes, 'minutes');
  }
}

const times = (date, interval) => Array.from(intervalIterator(date, interval));

const MINUTES_INTERVAL = 60; /** TODO: allow to set minutes interval as props */

const TimeView = ({ date, onChange, handleBackTime }) => (
    <>
      <Header>
        <NButton onClick={handleBackTime}>
          <MdChevronLeft />
        </NButton>
      </Header>
      <TimeTable>
        {times(date, MINUTES_INTERVAL).map(hour => (
          <Hour key={hour.format('HH:mm')} onClick={() => onChange(hour)}>
            {hour.format('HH:mm')}
          </Hour>
        ))}
      </TimeTable>
    </>
  );


TimeView.propTypes = {
  date: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  handleBackTime: PropTypes.func.isRequired,
};

export default TimeView;
