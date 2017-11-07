import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

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
`

const Backspace = styled.button`
    background: none;
    border: none;
    outline: none;
    font-size: 1.4em;
    padding-right: 5px;
`

const Display = styled.input`
    flex-grow: 1;
    alignSelf: right;
    height: 24px;
    border-radius: 0px;
    background: transparent;
    font-size: 1.3em;
    outline: none;
    border: none;    
`

const DisplayWrapper = ({ value, displayRule, cancel }) => (
    <Wrapper>
        <Display value={displayRule(value)} readOnly/>
        <Backspace onClick={cancel}><i className="fa fa-angle-double-left"/></Backspace>
    </Wrapper>
)

DisplayWrapper.propTypes = {
    value: PropTypes.string.isRequired,
    displayRule: PropTypes.func.isRequired,
    cancel: PropTypes.func
}

export default DisplayWrapper