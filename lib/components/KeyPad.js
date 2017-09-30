import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import Button from '../elements/Button'
import onClickOutside from 'react-onclickoutside'

const Container = styled.div`
    margin: auto;
    max-width: 300px;
    height: 100%;
    background: red;
    -webkit-transition: width 2s; /* For Safari 3.1 to 6.0 */
    transition: width 2s;
`

class KeyPad extends Component {

    handleClickOutside(evt) {
        this.props.hideKeyPad()
    }
    
    render() {
        return (
            <Container>I'm a keypad</Container>
        )    
    }
}
  
KeyPad.propTypes = {
    hideKeyPad: PropTypes.func.isRequired
}

export default onClickOutside(KeyPad)