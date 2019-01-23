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

const AppointmentEditor = props => (
  <NumPad {...props}>
    <Appointment {...defaultProps(props)} />
  </NumPad>
);

AppointmentEditor.propsType = {
  dateFormat: PropTypes.string,
  weekOffset: PropTypes.number,
  min: PropTypes.string,
  max: PropTypes.string,
  dates: {},
};

AppointmentEditor.defaultProps = {
  weekOffset: 0,
  dateFormat: 'DD.MM.YYYY',
  min: undefined,
  max: undefined,
  dates: PropTypes.objectOf(PropTypes.array),
};

export default AppointmentEditor;
