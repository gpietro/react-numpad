/* eslint-disable react/no-array-index-key */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Header, TwelveGrid, TwelveGridItem } from './CalendarUI';

const MonthView = ({ locale, handleChangeMonth }) => (
  <Fragment>
    <Header />
    <TwelveGrid>
      {Array(12)
        .fill()
        .map((_, i) => (
          <TwelveGridItem onClick={() => handleChangeMonth(i)} key={`month-${i}`}>
            {moment({ month: i })
              .locale(locale)
              .format('MMMM')}
          </TwelveGridItem>
        ))}
    </TwelveGrid>
  </Fragment>
);

MonthView.propTypes = {
  handleChangeMonth: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default MonthView;
