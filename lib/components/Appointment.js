import React from 'react';
import PropTypes from 'prop-types';
import NumPad from './NumPad';
import StaticWrapper from './StaticWrapper';
import { Appointment } from '../elements';

const defaultProps = props => ({
  validation: () => true,
  formatInputValue: value => value,
  keyValid: () => true,
  displayRule: value => value,
  ...props,
});

const AppointmentInput = props => {
  const { inline } = props;
  if (inline) {
    return (
      <StaticWrapper {...props}>
        <Appointment {...defaultProps(props)} />
      </StaticWrapper>
    );
  }
  return (
    <NumPad {...props} customInput={props.children}>
      <Appointment {...defaultProps(props)} />
    </NumPad>
  );
};

AppointmentInput.propsType = {
  dateFormat: PropTypes.string,
  weekOffset: PropTypes.number,
  min: PropTypes.string,
  max: PropTypes.string,
  dates: {},
};

AppointmentInput.defaultProps = {
  weekOffset: 0,
  dateFormat: 'DD.MM.YYYY',
  min: undefined,
  max: undefined,
  dates: PropTypes.objectOf(PropTypes.array),
};

export default AppointmentInput;
