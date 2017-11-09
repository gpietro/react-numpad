import React from 'react'
import moment from 'moment'
import MdCalendar from 'react-icons/lib/md/date-range'

import DatePicker from './DatePicker'

const validation = (value = '', dateFormat) => {
    console.log('value', value, 'dateformat', dateFormat)
    return moment(value, dateFormat).isValid()
}

const displayRule = (value) => (value)

const inputButtonContent = <MdCalendar />

export default DatePicker({validation, displayRule, inputButtonContent})