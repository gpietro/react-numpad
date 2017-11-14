import React from 'react'
import NumPad from './NumPad'
import IconClock from 'react-icons/lib/md/access-time'
import moment from 'moment'

const validation = (value = '') => {
    return value.length === 12
}

const keyValid = (value='', key) => {
    if(value.length === 12 || key === '-' || key === '.') return false
    if(value.length < 8) { // verify date
        let dateFormat = 'MM/DD/YYYY'
        let date = value + key + '01011004'.substring(value.length + 1)
        return moment(date, dateFormat).isValid()
    } else { // verify time
        let timeFormat = 'HH:mm'
        let time = value.substr(8, 4) + key + '0000'.substring(Math.max(0, value.length - 8))
        return moment(time, timeFormat).isValid()
    }
}

const displayRule = (value = '') => {
    value += '_'.repeat(12-value.length)
    let displayDate = [value.substr(0, 2), value.substr(2, 2), value.substr(4, 4)]
    let displayTime = [value.substr(8, 2), value.substr(10, 2)]
    
    return `${displayDate.join('/')} ${displayTime.join(':')}`
}

const inputButtonContent = <IconClock />

const float = false

const negative = false

export default NumPad({
    validation, 
    displayRule, 
    inputButtonContent, 
    float, 
    negative,
    keyValid
})