import React from 'react'
import NumPad from './NumPad'

const validation = value => true

const displayRule = value => value

export default NumPad({validation, displayRule})