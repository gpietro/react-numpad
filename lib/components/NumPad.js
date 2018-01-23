import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { injectGlobal, ThemeProvider } from 'styled-components'
import { InputField, Wrapper, KeyPad } from '../elements'
import { Portal } from 'react-portal'
import globalCSS from '../styles/global-css'
import styles from '../styles'

injectGlobal`${ globalCSS }`

export default ({validation, displayRule, inputButtonContent, keyValid}) => (
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
                updateValue = {value}
                this.props.onChange(value)
            }
            this.setState((prevState) => (Object.assign({}, { show: !prevState.show }, updateValue)))
        }

        render() {
            const {show, value} = this.state
            const { placeholder, label, theme, dateFormat } = this.props

            return <div className={this.props.className}>
                <ThemeProvider key='input-field' theme={styles(theme)}>
                    <InputField  
                        placeholder={placeholder}
                        showKeyPad={this.toggleKeyPad}
                        value={value}
                        dateFormat={dateFormat}
                        displayRule={displayRule}
                        label={label}
                        disabled={this.state.show}
                        buttonContent={inputButtonContent}
                    >
                        {this.props.children}
                    </InputField>                    
                </ThemeProvider>
                {show &&
                    <Portal>
                        <ThemeProvider key='key-pad' theme={styles(theme)}>
                            <Wrapper>
                                <KeyPad                                
                                    cancel={this.toggleKeyPad}
                                    confirm={this.confirm} 
                                    displayRule={displayRule} 
                                    validation={validation}
                                    keyValid={keyValid}
                                    label={label}
                                    {...this.props} />
                            </Wrapper>
                        </ThemeProvider>
                    </Portal>}
            </div>
        }
    }
)