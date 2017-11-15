import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import MdBackspace from 'react-icons/lib/md/backspace'

const Wrapper = styled.div`
    display: flex;
    padding: 0 5px;
    align-items: center;
    width: 100%;
    border: none;
    background: white;
`

const Backspace = styled.button`
    background: none;
    cursor: pointer;
    border: none;
    outline: none;
    font-size: 1.4em;
    color: ${props => props.theme.color.primary}
`

const Input = styled.input`
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
        <Backspace onClick={cancel}><MdBackspace /></Backspace>
    </Wrapper>
)

DisplayWrapper.propTypes = {
    value: PropTypes.string.isRequired,
    displayRule: PropTypes.func.isRequired,
    cancel: PropTypes.func
}

export default DisplayWrapper