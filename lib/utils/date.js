import moment from 'moment';

const VALIDATION_DATE = '19031001010203';
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
  const monthAt = cleanedDateFormat.search('MM');
  if (nextDate.isValid() === false && monthAt === position) {
    const valueParts = value.split('');
    return !!['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].find(month => {
      valueParts[monthAt + 1] = month;
      const findValidDate = valueParts.join('');
      return moment(findValidDate, cleanedDateFormat).isValid();
    });
  }
  return nextDate.isValid();
};

export { display, padding, validate };
