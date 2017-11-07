import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import 'font-awesome/scss/font-awesome.scss';

const Wrapper = styled.div`
    display: flex;
    padding: 5px;
    align-items: center;
    width: 100%;
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

const Input = styled.input`
    height: 24px;
    border-radius: 0px;
    background: transparent;
    font-size: 1.3em;
    outline: none;
    border: none;
    width: 100%;
`
const Display = styled.div`
    flex-grow: 1;
`

const DisplayWrapper = ({ value, displayRule, cancel }) => (
    <Wrapper>
        <Display><Input value={displayRule(value)} readOnly/></Display>
        <Backspace onClick={cancel}><i className="fa fa-angle-double-left"/></Backspace>
    </Wrapper>
)

DisplayWrapper.propTypes = {
    value: PropTypes.string.isRequired,
    displayRule: PropTypes.func.isRequired,
    cancel: PropTypes.func
}

export default DisplayWrapper