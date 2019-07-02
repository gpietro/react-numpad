import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import NumPad from './NumPad';
import StaticWrapper from './StaticWrapper';
import { Appointment } from '../elements';

const AppointmentInput = ({ inline, children, ...props }) => {
  const validation = () => true;

  const keyValid = () => true;

  // TODO: return value as moment object
  const displayRule = value =>
    moment(value, `DD.MM.YYYY HH:mm`).format(`${props.dateFormat} HH:mm`);

  if (inline) {
    return (
      <StaticWrapper {...props} displayRule={displayRule}>
        <Appointment
          validation={validation}
          keyValid={keyValid}
          displayRule={displayRule}
          position={props.position}
          {...props}
        />
      </StaticWrapper>
    );
  }
  return (
    <NumPad {...props} customInput={children} displayRule={displayRule}>
      <Appointment
        validation={validation}
        keyValid={keyValid}
        displayRule={displayRule}
        position={props.position}
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
