import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import MdEdit from 'react-icons/lib/md/mode-edit'

const Label = styled.label`    
    display: block;
    color: ${ props => props.disabled ? props.theme.color.secondary : '#555' };
    font-size: 0.8em;
`

const Input = styled.input`
    border: none; 
    padding-bottom: 3px;   
    border-bottom: 2px solid ${ props => props.disabled ? props.theme.color.secondary : '#555' };
`

const InputField = ({ placeholder, showKeyPad, value, label, disabled, buttonContent }) => (
    <div className={`numpad-input-value`} onClick={() => showKeyPad()}>
        <Input type='text' placeholder={placeholder} value={value} disabled={disabled} readOnly />            
        <Label disabled={disabled}>{ label ? `${label}` : ''}</Label>
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