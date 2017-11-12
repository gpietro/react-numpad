import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import onClickOutside from 'react-onclickoutside'
import Color from 'color'
import MdCheck from 'react-icons/lib/md/check'
import MdCancel from 'react-icons/lib/md/close'

import Button from './KeypadButton'
import Display from './Display'

const Container = styled.div`
    width: 100%;
    height: 250px;
    background-color: ${props => Color(props.theme.color.secondary).alpha(0.9).string()};
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 240px;
    height: 100%;
    background: ${props => props.theme.background.primary};
`

const Label = styled.div``

const Header = styled.div`
    display: flex;
    font-size: 1.2em;
    justify-content: space-between;    
    padding: 2px 5px;
    align-items: center;
    color: white;
    background: #383D3B;
`

const CancelButton = styled.button`
    color: ${props => props.theme.color.secondary};
    font-size: 1.2em;
    cursor: pointer;
    border: none;
    background: transparent;
    outline: none;
`

const ConfirmButton = CancelButton.extend`
    :disabled {
        color: ${props => Color(props.theme.color.secondary).darken(0.4).string()};
    }
`

const Keys = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-grow: 1;
    button {
        border-bottom: 1px solid #ddd;
        border-right: 1px solid #ddd;
    }
    button:nth-child(3n) {
        border-right: none;
    }
    button:nth-child(-n + 3) {
        border-top: 1px solid #ddd;
    }
`


class KeyPad extends Component {

    constructor(props) {
        super(props)
        this.state = { input: '' }
        this.handleClick = this.handleClick.bind(this)
        this.keyDown = this.keyDown.bind(this)
        this.cancelLastInsert = this.cancelLastInsert.bind(this)        
        this.numericKeys = [...Array(10).keys()]
    }

    handleClickOutside(evt) {
        evt.preventDefault()
        evt.stopPropagation()        
        this.props.cancel()
    }

    componentDidMount() {
        document.addEventListener('keydown', this.keyDown)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keyDown)
    }

    cancelLastInsert() {
        this.setState((prevState) => ({input: prevState.input.slice(0,-1)}))
    }

    keyDown(event) {
        event.preventDefault()                 
        let key = event.key
        if( key === 'Enter' ) {
            this.props.confirm(this.state.input) 
        } if(key === 'Backspace') {
            this.cancelLastInsert()
        } else if( key === 'Escape' ) {
            this.props.cancel() 
        } else {
            this.handleClick(key) 
        }
    }

    handleClick(key) {        
        if(this.props.keyValid(this.state.input, key)) {
            if(key === '-') {
                this.setState((prevState) => (
                    {input: prevState.input.charAt(0) === '-' ? prevState.input.substr(1) : '-' + prevState.input }
                ))
            } else {
                this.setState((prevState) => ({input: prevState.input + key}))
            }
        }
    }

    render() {
        let { displayRule, validation, label, confirm, cancel, theme, keyValid } = this.props
        
        return (
            <Container>
                <Content>
                    <Header>
                        <CancelButton onClick={cancel}>
                            <MdCancel />
                        </CancelButton>
                        <Label>{label}</Label>
                        <ConfirmButton onClick={() => confirm(this.state.input)} disabled={!validation(this.state.input)}>
                            <MdCheck />
                        </ConfirmButton>
                    </Header>
                    <Display    
                        value={this.state.input}
                        displayRule={displayRule}
                        cancel={this.cancelLastInsert} />
                    <Keys>
                        {[7, 8, 9, 4, 5, 6, 1, 2, 3, '-', 0, '.'].map( key => (
                            <Button
                                key={`button-${key}`}
                                theme={theme} 
                                click={(key) => this.handleClick(key) }
                                value={key}
                                disabled={!keyValid(this.state.input, key)} />
                        ))}
                    </Keys>
                </Content>
            </Container>
        )    
    }
}
  
KeyPad.propTypes = {
    confirm: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    displayRule: PropTypes.func,
    validation: PropTypes.func.isRequired,
    keyValid: PropTypes.func.isRequired
}

KeyPad.defaultProps = {
    displayRule: (value) => (value)
}

export default onClickOutside(KeyPad)