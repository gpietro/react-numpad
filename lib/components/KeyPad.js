import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import onClickOutside from 'react-onclickoutside'

import Button from '../elements/Button'
import KeyPadButton from './KeyPadButton'
import Display from './Display'

const Container = styled.div`
    display: flex;
    flex-direction: column;    
    margin: auto;
    max-width: 300px;
    height: 100%;
    background: red;    
`

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex: 5;
    justify-content: space-around;
    align-item: stretch;
`

class KeyPad extends Component {

    constructor(props) {
        super(props)
        this.state = { input: '' }
        this.keyClick = this.keyClick.bind(this)
    }

    handleClickOutside(evt) {
        this.props.hideKeyPad()
    }

    keyClick(keyPressed) {
        this.setState((prevState) => ({ input: prevState.input + keyPressed }))
    }

    onKeyPress(event) {
        console.log('event', event.key);
    }
    
    render() {
        return (
            <Container onKeyPress={this.onKeyPress}>
                <Display value={this.state.input} />
                <Wrapper>
                    {[7, 8, 9, 4, 5, 6, 1, 2, 3].map( val => (
                        <KeyPadButton key={`button-${val}`} value={val} click={this.keyClick} />
                    ))}
                </Wrapper>
            </Container>
        )    
    }
}
  
KeyPad.propTypes = {
    hideKeyPad: PropTypes.func.isRequired
}

export default onClickOutside(KeyPad)