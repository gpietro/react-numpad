import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import Input from './Input'

const InputField = ({ placeholder, showKeyPad, value, label }) => (
    <div className="NumPad-input" onClick={() => showKeyPad()}>
        <label>
            { label }
            <Input key='input' type='text' placeholder={placeholder} value={value} readOnly/>    
        </label>
        <Button key='button'>Show</Button>
    </div>
)

InputField.defaultProps = {
    placeholder: '',
    value: '',
    label: ''
};
  
InputField.propTypes = {
    showKeyPad: PropTypes.func.isRequired,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string
}

export default InputField