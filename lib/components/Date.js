import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { injectGlobal } from 'styled-components'
import globalCSS from '../styles/global'
import { InputField, KeyPadWrapper, KeyPad } from '../elements'
import wrapper from './wrapper'

injectGlobal`${ globalCSS }`

class Date extends Component {
    constructor(props) {
        super(props)
        this.validation = this.validation.bind(this)
    }

    validation(value) {
        if( !value || value.length === 0 ) { return true }
        return moment(value, 'DD.MM.YYYY').isValid()        
    }

    displayRule(value) {
       return value ? `${value.substr(0, 2)}.${value.substr(2, 2)}.${value.substr(4, 4)}` : ''
    }

    render() {
        const { placeholder, label, show, value, toggleKeyPad } = this.props

        return ([
            <InputField
                key='input-field'
                placeholder={placeholder}
                showKeyPad={(value) => toggleKeyPad(value, this.validation)}
                value={this.displayRule(value)}
                label={label} />,
            show &&
                <KeyPadWrapper key={`key-pad-wrapper`}>
                    <KeyPad
                        hideKeyPad={(value) => toggleKeyPad(value, this.validation)}
                        numberOfDigits={8}
                        displayRule={this.displayRule} 
                        validation={this.validation}
                        label={label} />
                </KeyPadWrapper>
        ])
    }
}

export default wrapper(Date)