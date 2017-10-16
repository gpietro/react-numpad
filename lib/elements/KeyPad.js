import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import onClickOutside from 'react-onclickoutside'

import Button from './Button'
// import KeyPadButton from './KeyPadButton'
import Display from './Display'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 300px;
    height: 100%;
`

const Wrapper = styled.div`
    display: flex;
    flex: 4;    
`

const NumericKeys = styled.div`
    display: flex;
    flex: 3;
    flex-wrap: wrap;
`

const SpecialKeys = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`

class KeyPad extends Component {

    constructor(props) {
        super(props)
        this.state = { input: '' }
        this.numericKeyClick = this.numericKeyClick.bind(this)
        this.specialKeyClick = this.specialKeyClick.bind(this)
        this.keyDown = this.keyDown.bind(this)
        this.cancelLastInsert = this.cancelLastInsert.bind(this)
        this.numericKeys = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0]
    }

    componentDidMount() {
        document.addEventListener('keydown', this.keyDown)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keyDown)
    }

    handleClickOutside(evt) {
        evt.preventDefault()
        evt.stopPropagation()        
        this.props.hideKeyPad(this.state.input)
    }

    cancelLastInsert() {
        this.setState((prevState) => ({input: prevState.input.slice(0,-1)}))
    }

    keyDown(event) {
        event.preventDefault()
        let key = event.key
        if( key === 'Backspace' ) {
            this.cancelLastInsert()
        }
        else if( ['Enter', 'Escape'].includes(key) ) {
            this.props.hideKeyPad(this.state.input)
        }
        else if( this.numericKeys.includes(parseFloat(key)) ) {
            this.numericKeyClick(key)
        }
        else if( this.props.specialKeys.includes(key) ) {
            this.specialKeyClick(key)
        }
    }

    numericKeyClick(keyPressed) {
        if( !this.props.numberOfDigits || this.state.input.length < this.props.numberOfDigits ) {
            this.setState((prevState) => ({ input: prevState.input + keyPressed }))
        }        
    }

    specialKeyClick(keyPressed) {
        // if( this.state.input.length === 0 ) return
        if(keyPressed === '-') {
            this.setState((prevState) => (
                {input: prevState.input.indexOf('-') === 0 ? prevState.input.substr(1) : '-' + prevState.input }
            ))
        }
        else if(keyPressed === '.' && this.state.input.indexOf('.') === -1) {
            this.setState((prevState) => ({input: prevState.input + keyPressed}))
        } else if(keyPressed === '<-') {
            this.setState((prevState) => ({input: prevState.input.slice(0, -1)}))
        }
    }

    render() {

        let { specialKeys, displayRule, validation, label } = this.props
        
        return (
            <Container>
                <Display
                    value={this.state.input}
                    displayRule={displayRule}
                    validation={validation}
                    label={label}
                    cancel={this.cancelLastInsert} />
                <Wrapper>
                    <NumericKeys>
                        {this.numericKeys.map( val => (
                            <StyledKeyPadButton 
                                style={{width: '70px'}} 
                                key={`button-${val}`} 
                                value={val} 
                                click={this.numericKeyClick}
                                {...this.props} />
                        ))}
                    </NumericKeys>
                    { specialKeys && 
                        <SpecialKeys>
                            {specialKeys.map( val => (
                                <StyledKeyPadButton 
                                    key={`button-${val}`} 
                                    value={val} 
                                    click={this.specialKeyClick}
                                    {...this.props} />
                            ))}
                        </SpecialKeys>
                    }                    
                </Wrapper>
            </Container>
        )    
    }
}
  
KeyPad.propTypes = {
    hideKeyPad: PropTypes.func.isRequired,
    specialKeys: PropTypes.array,
    numberOfDigits: PropTypes.number,
    displayRule: PropTypes.func,
    validation: PropTypes.func
}

KeyPad.defaultProps = {
    displayRule: (value) => (value),
    validation: () => true,
    specialKeys: []
}

export default onClickOutside(KeyPad)

const KeyPadButton = ({ value, click, theme }) => (
    <Button
        theme={theme} 
        className='NumPad-keypad-button' 
        onClick={() => click(value)}
        value={value} />
)

const StyledKeyPadButton = styled(KeyPadButton)`
    width: 72px;
`