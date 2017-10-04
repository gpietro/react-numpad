import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from './Button'
import Input from './Input'

const Wrapper = styled.button`
    font-family: inherit;
    flex: 1;
    width: 100%;
    margin: 10px auto;
    background: ${props => props.isValid ? '#fff' : 'yellow'};
    border: none;
    color: #3a3a3a;
    cursor: none;
    font-size: 16px;
    line-height: 40px;
    font-weight: 200;
    border-radius: 3px;
    box-shadow: 
        inset 0 -2px 0 #aaaaaa,
        inset 0px 1px 1px -1px #fff,
        0px 1px 1px 0px #7a7a7a;
`

const Label = styled.div`
    font-size: 12px
`

const Display = ({ value, displayRule, validation, label }) => ([
    <Label>{label}</Label>,
    <Wrapper isValid={validation(value)}>{displayRule(value)}</Wrapper>
])

Display.defaultProps = {
    label: ''
}

Display.propTypes = {
    value: PropTypes.string.isRequired,
    displayRule: PropTypes.func.isRequired,
    validation: PropTypes.func.isRequired,
    label: PropTypes.string
}

export default Display