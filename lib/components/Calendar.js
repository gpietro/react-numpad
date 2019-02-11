import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import MdCalendar from 'react-icons/lib/md/date-range';
import NumPad from './NumPad';
import { Calendar } from '../elements';
import StaticWrapper from './StaticWrapper';
import { display } from '../utils/date';

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

const CalendarInput = props => (
  <NumPad {...props} customInput={props.children} buttonContent={<MdCalendar />}>
    <Calendar {...defaultProps(props)} />
  </NumPad>
);

const CalendarKeyPad = props => (
  <StaticWrapper {...props}>
    <Calendar {...defaultProps(props)} />
  </StaticWrapper>
);

CalendarInput.propsType = {
  dateFormat: PropTypes.string,
  weekOffset: PropTypes.number,
  min: PropTypes.string,
  max: PropTypes.string,
  markers: PropTypes.arrayOf(PropTypes.string),
};

CalendarInput.defaultProps = {
  weekOffset: 0,
  dateFormat: 'DD.MM.YYYY',
  min: undefined,
  max: undefined,
  markers: [],
};

CalendarKeyPad.propsType = {
  dateFormat: PropTypes.string,
  weekOffset: PropTypes.number,
  min: PropTypes.string,
  max: PropTypes.string,
  markers: PropTypes.arrayOf(PropTypes.string),
  cancel: PropTypes.func,
};

CalendarKeyPad.defaultProps = {
  weekOffset: 0,
  dateFormat: 'DD.MM.YYYY',
  min: undefined,
  max: undefined,
  markers: [],
  cancel: () => console.warn('cancel callback is undefined.'),
};

export { CalendarInput, CalendarKeyPad };
