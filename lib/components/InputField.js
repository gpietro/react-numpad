import React from 'react'
import PropTypes from 'prop-types'
import Button from '../elements/Button'
import Input from '../elements/Input'

const InputField = (props) => {
    const { placeholder, showKeyPad } = props;

    return ([
        <Input key='input' type='text' placeholder={placeholder} />,
        <Button key='button' onClick={() => showKeyPad()}>Show</Button>
    ])    
}

InputField.defaultProps = {
    placeholder: '',
};
  
InputField.propTypes = {
    showKeyPad: PropTypes.func.isRequired,
    placeholder: PropTypes.string
}
export default InputField