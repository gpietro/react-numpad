import React from 'react'
import PropTypes from 'prop-types'

const InputField = ({ placeholder, showKeyPad, value, label, disabled, buttonContent }) => (
    <div onClick={() => showKeyPad()}>
        <label>
            { label }
            <input type='text' placeholder={placeholder} value={value} readOnly />    
        </label>
        <button disabled={disabled}>{buttonContent}</button>
    </div>
)

InputField.defaultProps = {
    placeholder: '',
    value: '',
    label: '',
    buttonContent: <span className="fa fa-pencil"/>
};
  
InputField.propTypes = {
    showKeyPad: PropTypes.func.isRequired,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string
}

export default InputField