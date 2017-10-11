import moment from 'moment'
import NumPad from './NumPad'

const validation = (value = '') => {
    return value.length === 8 && moment(value, 'DD.MM.YYYY').isValid()        
}

const displayRule = (value) => (
    value ? `${value.substr(0, 2)}.${value.substr(2, 2)}.${value.substr(4, 4)}` : ''
)

const numberOfDigits = 8

export default NumPad({validation, displayRule, numberOfDigits})