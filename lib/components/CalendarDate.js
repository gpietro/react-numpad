import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Calendar } from '../elements';
import { display } from '../utils/date';
import NumPad from './NumPad';

const defaultProps = props => ({
  validation: (value = '') => value.length === 12,
  formatInputValue: value => value.toString().replace(/\D+/g, ''),
  keyValid: (value, min, max, dateFormat) => {
    const validAfter = min ? value.isSameOrAfter(moment(min, dateFormat)) : true;
    const validBefore = max ? value.isSameOrBefore(moment(max, dateFormat)) : true;
    return validAfter && validBefore;
  },
  displayRule: (value = '', dateFormat) => display(value, dateFormat.replace(/[a-z]/gi, '_')),
  ...props,
});

const CalendarTime = props => (
  <NumPad {...props}>
    <Calendar {...defaultProps(props)} />
  </NumPad>
);

CalendarTime.propsType = {
  dateFormat: PropTypes.string,
  weekOffset: PropTypes.number,
  min: PropTypes.string,
  max: PropTypes.string,
};

CalendarTime.defaultProps = {
  weekOffset: 0,
  dateFormat: 'DD.MM.YYYY',
  min: undefined,
  max: undefined,
};

export default CalendarTime;
