import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from './Button'
import Input from './Input'

import 'font-awesome/scss/font-awesome.scss';

const Wrapper = styled.div`
    display: flex;
    height: 40px;
    padding: 5px;
    align-items: center;
    width: 100%;
    margin: auto;    
    border: none;
    background: white;
    
    .NumPad-display {
        flex-grow: 1;
    
        .NumPad-display-value {
            width: 100%;
            alignSelf: right;
            height: 24px;
        }
    }

    .NumPad-display-icon {
        background: none;
        border: none;
        outline: none;
        font-size: 1.4em;
        color: #00d8ff;
        padding-right: 5px;
    }
`

const Display = ({ value, displayRule, validation, cancel }) => (
    <Wrapper className='NumPad-display-wrapper' isValid={validation(value)}>
        <div className='NumPad-display'>            
            <Input className='NumPad-display-value' value={displayRule(value)} />
        </div>
        <button className='NumPad-display-icon' onClick={cancel}>
            <i className="fa fa-angle-double-left"/>
        </button>
    </Wrapper>
)

Display.propTypes = {
    value: PropTypes.string.isRequired,
    displayRule: PropTypes.func.isRequired,
    validation: PropTypes.func.isRequired,
    cancel: PropTypes.func
}

export default Display