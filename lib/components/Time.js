import NumPad from './NumPad'

const validation = (value = '') => {
    let length = value.length === 4
    let hours = Number.parseFloat(value.substr(0, 2)) < 24
    let minutes = Number.parseFloat(value.substr(2, 4)) < 60
    
    return length && hours && minutes
}

const displayRule = (value) => {
    let splitValue = value ? [value.substr(0, 2), value.substr(2, 4)] : ''
    return value.length > 1 ? splitValue.join(':') : splitValue
}

const numberOfDigits = 4

export default NumPad({validation, displayRule, numberOfDigits})