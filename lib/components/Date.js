import moment from 'moment'
import DatePicker from './DatePicker'

const validation = (value = '') => {
    return value.length === 10 && moment(value, 'DD.MM.YYYY').isValid()        
}

const displayRule = (value) => (value)

const numberOfDigits = 8

export default DatePicker({validation, displayRule, numberOfDigits})