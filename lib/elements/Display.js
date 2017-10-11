import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from './Button'
import Input from './Input'

import 'font-awesome/scss/font-awesome.scss';

const Wrapper = styled.div`
    font-family: inherit;
    flex: 1;
    width: 100%;
    margin: 5px auto;
    background: ${props => props.isValid ? '#fff' : 'yellow'};
    border: none;
    color: #3a3a3a;
    font-size: 16px;
    line-height: 40px;
    font-weight: 200;
    border-radius: 2px;
    text-align: center;
`

const Label = styled.div`
    font-size: 12px
`

const Display = ({ value, displayRule, validation, label }) => ([
    <Label className='NumPad-display-label' key='display-label'>{label}</Label>,
    <Wrapper className='NumPad-display-value' key='display-wrapper' isValid={validation(value)}>
        {displayRule(value)} <span className="fa fa-eraser" />
    </Wrapper>
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