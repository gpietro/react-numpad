import React from 'react'
import moment from 'moment'
import DatePicker from './DatePicker'

const validation = (value = '', dateFormat) => {
    console.log('value', value, 'dateformat', dateFormat)
    return moment(value, dateFormat).isValid()
}

const displayRule = (value) => (value)

const inputButtonContent = <span className="fa fa-calendar"/>

export default DatePicker({validation, displayRule, inputButtonContent})