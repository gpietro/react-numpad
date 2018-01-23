import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import MdEdit from 'react-icons/lib/md/mode-edit'

const Label = styled.label`    
    color: ${ props => props.disabled ? props.theme.color.secondary : props.theme.color.primary };
    font-size: 0.8em;
`
Label.displayName = 'Label'

const Input = styled.input`
    
`
Input.displayName = 'Input'

const InputField = ({ placeholder, showKeyPad, value, dateFormat, displayRule, label, disabled, buttonContent, children }) => (
    <div className={`numpad-input-value`} onClick={showKeyPad}>
        { label && <Label disabled={disabled}>{label}</Label>}
        {
            children ? 
                React.Children.map( 
                    children, (child) => 
                        React.cloneElement(child, {
                            placeholder: placeholder,
                            value: value ? displayRule(value, dateFormat) : value, 
                            disabled: disabled
                })) :
            <Fragment>
                <Input
                    placeholder={placeholder}
                    value={value ? displayRule(value, dateFormat) : value}
                    disabled={disabled} 
                    readOnly /> 
                { buttonContent && <button>{ buttonContent }</button> }
            </Fragment>
        }        
    </div>
)

InputField.displayName = 'InputField'

InputField.defaultProps = {
    placeholder: '',
    value: '',
    dateFormat: 'MM/DD/YYYY',
    label: ''
}
  
InputField.propTypes = {
    showKeyPad: PropTypes.func.isRequired,
    displayRule: PropTypes.func.isRequired,
    dateFormat: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string
}

export default InputField