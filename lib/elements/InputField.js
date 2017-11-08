import React from 'react'
import PropTypes from 'prop-types'
import MdEdit from 'react-icons/lib/md/mode-edit'

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
    buttonContent: <MdEdit />
};
  
InputField.propTypes = {
    showKeyPad: PropTypes.func.isRequired,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string
}

export default InputField