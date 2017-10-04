import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectGlobal } from 'styled-components'
import globalCSS from '../styles/global'
import { InputField, KeyPadWrapper, KeyPad } from '../elements'

injectGlobal`${ globalCSS }`

class Number extends Component {
    constructor(props) {
        super(props)
        this.state = { show: false, value: '' }
        this.toggleKeyPad = this.toggleKeyPad.bind(this)
    }

    toggleKeyPad(value) {
        console.log('value', value)
        this.setState((prevState) => ({show: !prevState.show, value: value}))
    }

    render() {
        const { placeholder } = this.props
        const { show } = this.state

        return ([
            <InputField 
                key='input-field' 
                placeholder={placeholder} 
                showKeyPad={this.toggleKeyPad} 
                value={this.state.value} />,
            show && 
                <KeyPadWrapper key='key-pad-wrapper'>
                    <KeyPad 
                        hideKeyPad={this.toggleKeyPad} 
                        specialKeys={['-', '.', '<-']} />
                </KeyPadWrapper>
        ])
    }
}

export default Number