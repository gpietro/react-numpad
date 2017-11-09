import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import MdEdit from 'react-icons/lib/md/mode-edit'

const Label = styled.label`    
    border: 1px solid ${ props => props.disabled ? props.theme.color.secondary : props.theme.color.primary };
    font-size: 0.9em;
    padding: 3px 3px 4px 3px;
    border-right: none;
`

const Button = styled.button`
    background: none;
    border: 1px solid ${ props => props.disabled ? props.theme.color.secondary : props.theme.color.primary };
    border-left: none;
    outline: none;
`

const Input = styled.input`
    border: none;
    padding-bottom: 3px;
    padding-top: 2px;
    border-top: 1px solid ${ props => props.disabled ? props.theme.color.secondary : props.theme.color.primary };
    border-bottom: 1px solid ${ props => props.disabled ? props.theme.color.secondary : props.theme.color.primary };
`

const InputField = ({ placeholder, showKeyPad, value, label, disabled, buttonContent }) => (
    <div onClick={() => showKeyPad()}>
        <Label disabled={disabled}>{ label ? `${label}:` : ''}</Label>
        <Input type='text' placeholder={placeholder} value={value} disabled={disabled} readOnly />    
        <Button disabled={disabled}>{buttonContent}</Button>
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