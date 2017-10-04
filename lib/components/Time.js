import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectGlobal } from 'styled-components'
import globalCSS from '../styles/global'
import { InputField, KeyPadWrapper, KeyPad } from '../elements'

injectGlobal`${ globalCSS }`

class Time extends Component {
    constructor(props) {
        super(props)
        this.state = { show: false, value: '' }
        this.toggleKeyPad = this.toggleKeyPad.bind(this)
        this.validation = this.validation.bind(this)
    }

    toggleKeyPad(value) {
        let updateValue = this.state.show && this.validation(value) ? {value} : {}
        this.setState((prevState) => (Object.assign({}, { show: !prevState.show }, updateValue)))
    }

    validation(value) {
        if( !value || value.length === 0 ) { return true }
        
        let length = value.length === 4
        let hours = Number.parseFloat(value.substr(0, 2)) < 24
        let minutes = Number.parseFloat(value.substr(2, 4)) < 60
        
        return length && hours && minutes
    }

    displayRule(value) {
        let splitValue = value ? [value.substr(0, 2), value.substr(2, 4)] : ''
        return value.length > 1 ? splitValue.join(':') : splitValue
    }

    render() {
        const { placeholder } = this.props
        const { show, value } = this.state

        return ([
            <InputField 
                key='input-field' 
                placeholder={placeholder} 
                showKeyPad={this.toggleKeyPad}
                value={this.displayRule(value)} />,
            show && 
                <KeyPadWrapper key='key-pad-wrapper'>
                    <KeyPad
                        hideKeyPad={this.toggleKeyPad} 
                        specialKeys={['<-']}
                        numberOfDigits={4}
                        displayRule={this.displayRule} 
                        validation={this.validation} />
                </KeyPadWrapper>
        ])
    }
}

export default Time