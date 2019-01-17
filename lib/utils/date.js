import moment from 'moment';

const VALIDATION_DATE = '20201001010203';
const VALIDATION_FORMAT = 'YYYYMMDDHHmmss';

const display = (value, dateFormat) => {
  let newValue = '';
  for (let i = 0, offset = 0; i < dateFormat.length; i += 1) {
    if (dateFormat[i].search(/[a-z_]/gi) === -1 || !value[offset]) {
      newValue += dateFormat[i];
    } else {
      newValue += value[offset];
      offset += 1;
    }
  }
  return newValue;
};

const padding = (value, dateFormat) => {
  const cleanedDateFormat = dateFormat.replace(/[^a-z]/gi, '');
  const checkDate = moment(VALIDATION_DATE, VALIDATION_FORMAT).format(cleanedDateFormat);
  return value + checkDate.substring(value.length, cleanedDateFormat.length);
};

const validate = (value, dateFormat = '', position) => {
  const cleanedDateFormat = dateFormat.replace(/[^a-z]/gi, '');

  const nextDate = moment(value, cleanedDateFormat);
  if (value.length !== cleanedDateFormat.length) {
    return false;
  }
  const monthAt = cleanedDateFormat.search('MM');
  if (nextDate.isValid() === false && monthAt === position) {
    const valueParts = value.split('');
    return !!['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].find(month => {
      valueParts[monthAt + 1] = month;
      const findValidDate = valueParts.join('');
      return moment(findValidDate, cleanedDateFormat).isValid();
    });
  }

  const dayStartAt = cleanedDateFormat.indexOf('D');
  const dayEndAt = cleanedDateFormat.lastIndexOf('D');
  const monthStartAt = cleanedDateFormat.indexOf('M');
  const monthEndAt = cleanedDateFormat.lastIndexOf('M');
  const yearStartAt = cleanedDateFormat.indexOf('Y');
  const yearEndAt = cleanedDateFormat.lastIndexOf('Y');
  const day = value.substring(dayStartAt, dayEndAt + 1);
  const month = value.substring(monthStartAt, monthEndAt + 1);
  if (
    day === '29' &&
    (month === '02' || month === '2') &&
    (position >= yearStartAt && position < yearEndAt)
  ) {
    // is always true correct ?
    return true;
  }
  return nextDate.isValid();
};

export { display, padding, validate };
