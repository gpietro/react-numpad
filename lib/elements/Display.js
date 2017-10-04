import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from './Button'
import Input from './Input'

const Wrapper = styled.div`
    flex: 1;
    width: 90%;
    margin: auto;
    background: ${props => props.isValid ? 'blue' : 'red'};
    color: white;
`

const Display = (props) => {
    const { value, displayRule, validation } = props;

    return (<Wrapper isValid={validation(value)}>{displayRule(value)}</Wrapper>)    
}
  
Display.propTypes = {
    value: PropTypes.string.isRequired,
    displayRule: PropTypes.func.isRequired,
    validation: PropTypes.func.isRequired
}

export default Display