import React from 'react'
import NumPad from './NumPad'
import IconClock from 'react-icons/lib/md/access-time'
import moment from 'moment'

const validation = (value = '') => {
    return value.length === 8
}

const keyValid = (value='', key) => {
    let dateFormat = 'MM/DD/YYYY'
    if(value.length === 8) return false
    let date = value + key + '1'.repeat(7-value.length)
    return moment(date, dateFormat).isValid()
}

const displayRule = (value = '') => {
    value += '_'.repeat(8-value.length)
    let splitValue = value ? [value.substr(0, 2), value.substr(2, 2), value.substr(4, 4)] : ''
    return value.length > 1 ? splitValue.join('/') : splitValue
}

const inputButtonContent = <IconClock />

export default NumPad({
    validation, 
    displayRule, 
    inputButtonContent, 
    keyValid
})