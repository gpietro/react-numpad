import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from './Button'
import Input from './Input'

const Wrapper = styled.div`
    flex: 1;
    width: 90%;
    margin: auto;
    background: blue;
    color: white;
`

const Display = (props) => {
    const { value, displayRule } = props;

    return (<Wrapper>{displayRule(value)}</Wrapper>)    
}
  
Display.propTypes = {
    value: PropTypes.string.isRequired,
    displayRule: PropTypes.func.isRequired
}

export default Display