import React from 'react'
import NumPad from './NumPad'
import IconEdit from 'react-icons/lib/md/edit'

const defaultProps = {
    numberOfDigits: null,
    validation: value => true,
    displayRule: value => value,
    negative: true,
    float: true,
    inputButtonContent: <IconEdit />
}

const Number = NumPad(defaultProps)
const PositiveNumber = NumPad(Object.assign({}, defaultProps, {negative: false}))

export {
    Number,
    PositiveNumber
}