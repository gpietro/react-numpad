import React from 'react';
import PropTypes from 'prop-types';
import NumPad from './NumPad';
import { Appointment } from '../elements';

const defaultProps = props => ({
  validation: () => true,
  formatInputValue: value => value,
  keyValid: () => true,
  displayRule: value => value,
  ...props,
});

const CalendarAppointment = props => (
  <NumPad {...props} customInput={props.children}>
    <Appointment {...defaultProps(props)} />
  </NumPad>
);

CalendarAppointment.propsType = {
  dateFormat: PropTypes.string,
  weekOffset: PropTypes.number,
  min: PropTypes.string,
  max: PropTypes.string,
  dates: {},
};

CalendarAppointment.defaultProps = {
  weekOffset: 0,
  dateFormat: 'DD.MM.YYYY',
  min: undefined,
  max: undefined,
  dates: PropTypes.objectOf(PropTypes.array),
};

export default CalendarAppointment;
