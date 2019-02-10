import { NumberInput, NumberKeyPad } from './components/NumberInput';
import DateTime from './components/DateTime';
import Calendar from './components/CalendarDate';
import Appointment from './components/CalendarAppointment';

const NumPad = { Number: NumberInput, DateTime, Calendar, Appointment };
const KeyPad = { Number: NumberKeyPad };
export default NumPad
export { 
    KeyPad
};
