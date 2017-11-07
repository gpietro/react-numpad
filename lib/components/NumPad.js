import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { injectGlobal, ThemeProvider } from 'styled-components'
import { InputField, KeyPadWrapper, KeyPad } from '../elements'
import globalCSS from '../styles/global-css'
import styles from '../styles'

injectGlobal`${ globalCSS }`

export default ({validation, displayRule, numberOfDigits, negative, float, inputButtonContent}) => (
    class NumPad extends Component {
        constructor(props) {
            super(props)
            this.state = { show: false, value: '' }
            this.toggleKeyPad = this.toggleKeyPad.bind(this)
            this.confirm = this.confirm.bind(this)
        }

        toggleKeyPad(value) {
            this.setState((prevState) => ({ show: !prevState.show }))
        }

        confirm(value) {
            let updateValue = {}
            if(this.state.show && validation(value)) {
                console.log('update value')
                updateValue = {value}
                this.props.onChange(value)
            }
            this.setState((prevState) => (Object.assign({}, { show: !prevState.show }, updateValue)))
        }

        render() {
            const {show, value} = this.state
            const { placeholder, label, theme } = this.props

            return [
                <ThemeProvider key='input-field' theme={styles(theme)}>
                    <InputField
                        placeholder={placeholder}
                        showKeyPad={this.toggleKeyPad}
                        value={displayRule(value)}
                        label={label}
                        disabled={this.state.show}
                        buttonContent={inputButtonContent} />
                </ThemeProvider>,
                show &&
                    <ThemeProvider key='key-pad' theme={styles(theme)}>
                        <KeyPadWrapper>
                            <KeyPad                           
                                cancel={this.toggleKeyPad}
                                confirm={this.confirm} 
                                numberOfDigits={numberOfDigits}                            
                                negative={negative}
                                float={float}
                                displayRule={displayRule} 
                                validation={validation}
                                label={label}
                                {...this.props} />
                        </KeyPadWrapper>
                    </ThemeProvider>
            ]
        }
    }
)