import React, { useMemo } from 'react';
import moment from 'moment';
import HeaderMonth from './ui/HeaderMonth';

export default ({ chunkDates, index, dateFormat }) => {
  const headerMonths = useMemo(
    () => {
      const months = {};
      chunkDates[index].forEach(date => {
        const month = moment(date, dateFormat).format('MMMM');
        if (month in months) {
          months[month] += 1;
        } else {
          months[month] = 1;
        }
      });
      return months;
    },
    [chunkDates, index, dateFormat]
  );

  console.log('heaer', headerMonths);

  return (
    <div style={{ display: 'flex' }}>
      {Object.keys(headerMonths || {}).map(month => (
        <HeaderMonth key={month} widthHeader={headerMonths[month]}>
          {month}
        </HeaderMonth>
      ))}
    </div>
  );
};
