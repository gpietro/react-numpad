import NumPad from './NumPad'

const validation = value => true

const displayRule = value => value

const specialKeys = ['-', '.', '<-']

export default NumPad({validation, displayRule, specialKeys})