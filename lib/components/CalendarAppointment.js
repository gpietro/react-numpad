import React from 'react';
import MdCalendar from 'react-icons/lib/md/date-range';
import moment from 'moment';
import { Appointment } from '../elements';
import NumPad from './NumPad';

const validation = () => true;

const keyValid = () => true;

const formatInputValue = value => value;

const displayRule = value => value;

const inputButtonContent = <MdCalendar />;

export default NumPad({
  element: Appointment,
  keyValid,
  formatInputValue,
  validation,
  displayRule,
  inputButtonContent,
});
