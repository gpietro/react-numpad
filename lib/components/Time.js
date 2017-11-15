import React from 'react'
import NumPad from './NumPad'
import IconClock from 'react-icons/lib/md/access-time'
import moment from 'moment'

const validation = (value = '') => {
    return value.length === 4
}

const keyValid = (value='', key) => {
    if(value.length === 4 || key === '-' || key === '.') return false    
    let time = value + key + '0'.repeat(3-value.length)
    return moment(time, 'HHmm').isValid()
}

const displayRule = (value = '') => {
    value += '_'.repeat(4-value.length)
    let splitValue = value ? [value.substr(0, 2), value.substr(2, 4)] : ''
    return value.length > 1 ? splitValue.join(':') : splitValue
}

const inputButtonContent = <IconClock />

export default NumPad({
    validation, 
    displayRule, 
    inputButtonContent, 
    keyValid
})