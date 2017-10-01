import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from '../elements/Button'
import Input from '../elements/Input'

const Wrapper = styled.div`
    flex: 1;
    width: 90%;
    margin: auto;
    background: blue;
    color: white;
`

const Display = (props) => {
    const { value } = props;

    return (<Wrapper>{value}</Wrapper>)    
}
  
Display.propTypes = {
    value: PropTypes.string.isRequired
}

export default Display