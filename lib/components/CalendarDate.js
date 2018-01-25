import React from 'react';
import moment from 'moment';
import MdCalendar from 'react-icons/lib/md/date-range';
import { Calendar } from '../elements';
import NumPad from './NumPad';

const validation = () => true;

const displayRule = value => value;

const inputButtonContent = <MdCalendar />;

export default NumPad({
  element: Calendar,
  validation,
  displayRule,
  inputButtonContent,
});
