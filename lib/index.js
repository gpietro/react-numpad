import { NumberInput, NumberKeyPad } from './components/Number';
import { DateTimeInput, DateTimeKeyPad } from './components/DateTime';
import { CalendarInput, CalendarKeyPad } from './components/Calendar';
import { AppointmentInput, AppointmentKeyPad } from './components/Appointment';

const NumPad = { Number: NumberInput, DateTime: DateTimeInput, Calendar: CalendarInput, Appointment: AppointmentInput };
const KeyPad = { Number: NumberKeyPad, DateTime: DateTimeKeyPad, Calendar: CalendarKeyPad, Appointment: AppointmentKeyPad  };
export default NumPad
export { 
    KeyPad
};
