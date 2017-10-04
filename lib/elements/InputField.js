import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import Input from './Input'

const InputField = (props) => {
    const { placeholder, showKeyPad, value } = props;

    return (
        <div onClick={() => showKeyPad()}>
            <Input key='input' type='text' placeholder={placeholder} value={value} readOnly/>
            <Button key='button'>Show</Button>
        </div>)    
}

InputField.defaultProps = {
    placeholder: '',
    value: ''
};
  
InputField.propTypes = {
    showKeyPad: PropTypes.func.isRequired,
    value: PropTypes.string,
    placeholder: PropTypes.string
}
export default InputField