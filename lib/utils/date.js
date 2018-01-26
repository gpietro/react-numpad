import moment from 'moment';

const VALIDATION_DATE = '01011004';
const VALIDATION_FORMAT = 'MMDDYYYY';

const display = (value, dateFormat) => {
  const newValue =
    value + '_'.repeat(Math.max(0, dateFormat.replace(/[^a-z]/gi, '').length - value.length));
  const symbol = dateFormat.replace(/[!^a-z]/gi, '')[0];
  return dateFormat
    .split(/[.,/ -]/)
    .map(d => d.length)
    .reduce((p, c, i) => (p.length > 0 ? [...p, [p[i - 1][1], c + p[i - 1][1]]] : [[0, c]]), [])
    .map(s => newValue.substring(s[0], s[1]))
    .join(symbol);
};

const validate = (value, key, dateFormat) => {
  const checkDate = moment(VALIDATION_DATE, VALIDATION_FORMAT).format(
    dateFormat.replace(/[^a-z]/gi, '')
  );
  const date = value + key + checkDate.substring(value.length + 1);
  return moment(date, dateFormat).isValid();
};

export default {
  display,
  validate,
};
