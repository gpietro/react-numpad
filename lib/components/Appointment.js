import React from 'react';
import PropTypes from 'prop-types';
import NumPad from './NumPad';
import StaticWrapper from './StaticWrapper';
import { Appointment } from '../elements';

const AppointmentInput = ({ inline, children, ...props }) => {
  const validation = () => true;

  const keyValid = () => true;

  const displayRule = value => value;

  if (inline) {
    return (
      <StaticWrapper {...props}>
        <Appointment
          validation={validation}
          keyValid={keyValid}
          displayRule={displayRule}
          {...props}
        />
      </StaticWrapper>
    );
  }
  return (
    <NumPad {...props} 
      customInput={children}      
      displayRule={displayRule}>
      <Appointment
        validation={validation}
        keyValid={keyValid}
        displayRule={displayRule}
        {...props}
      />
    </NumPad>
  );
};

AppointmentInput.propsType = {
  dateFormat: PropTypes.string,
  weekOffset: PropTypes.number,
  min: PropTypes.string,
  max: PropTypes.string,
  dates: {},
  validation: PropTypes.func,
  keyValid: PropTypes.func,
  displayRule: PropTypes.func,
};

AppointmentInput.defaultProps = {
  weekOffset: 0,
  dateFormat: 'DD.MM.YYYY',
  min: undefined,
  max: undefined,
  dates: PropTypes.objectOf(PropTypes.array),
};

export default AppointmentInput;
