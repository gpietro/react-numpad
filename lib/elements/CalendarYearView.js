import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import MdChevronLeft from 'react-icons/lib/md/chevron-left';
import MdChevronRight from 'react-icons/lib/md/chevron-right';
import { Header, TwelveGrid, TwelveGridItem } from './CalendarUI';
import NButton from './ui';

const YearView = ({ date, handleChangeYear }) => {
  const [year, setYear] = useState(date.year());

  const prev = () => {
    setYear(year - 12);
  };

  const next = () => {
    setYear(year + 12);
  };

  return (
    <Fragment>
      <Header>
        <NButton onClick={prev}>
          <MdChevronLeft />
        </NButton>
        <NButton onClick={next}>
          <MdChevronRight />
        </NButton>
      </Header>
      <TwelveGrid>
        {Array(12)
          .fill()
          .map((_, i) => (
            <TwelveGridItem
              onClick={() => handleChangeYear(year - 5 + i)}
              key={`month-${year - 5 + i}`}
            >
              {year - 5 + i}
            </TwelveGridItem>
          ))}
      </TwelveGrid>
    </Fragment>
  );
};

YearView.propTypes = {
  handleChangeYear: PropTypes.func.isRequired,
  date: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default YearView;
