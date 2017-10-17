import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { injectGlobal } from 'styled-components'
import { InputField, KeyPadWrapper, KeyPad } from '../elements'
import globalCSS from '../styles/global-css'

injectGlobal`${ globalCSS }`

export default ({validation, displayRule, numberOfDigits, negative, float, inputButtonContent}) => (
    class NumPad extends Component {
        constructor(props) {
            super(props)
            this.state = { show: false, value: '' }
            this.toggleKeyPad = this.toggleKeyPad.bind(this)
        }

        toggleKeyPad(value) {
            let updateValue = {}
            if(this.state.show && validation(value)) {
                updateValue = {value}
                this.props.onChange(value)
            }
            this.setState((prevState) => (Object.assign({}, { show: !prevState.show }, updateValue)))
        }

        render() {
            const {show, value} = this.state
            const { placeholder, label } = this.props

            return [
                <InputField
                    key='input-field'
                    placeholder={placeholder}
                    showKeyPad={this.toggleKeyPad}
                    value={displayRule(value)}
                    label={label}
                    disabled={this.state.show}
                    buttonContent={inputButtonContent} />,
                show &&
                    <KeyPadWrapper key={`key-pad-wrapper`}>
                        <KeyPad                            
                            hideKeyPad={this.toggleKeyPad}
                            numberOfDigits={numberOfDigits}                            
                            negative={negative}
                            float={float}
                            displayRule={displayRule} 
                            validation={validation}
                            label={label} />
                    </KeyPadWrapper>
            ]
        }
    }
)