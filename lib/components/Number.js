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
        let updateValue = this.state.show ? {value} : {}
        this.setState((prevState) => (Object.assign({}, { show: !prevState.show }, updateValue)), () => this.props.onChange(value))
    }

    render() {
        const { placeholder } = this.props
        const { show, value } = this.state

        return ([
            <InputField 
                key='input-field' 
                placeholder={placeholder} 
                showKeyPad={this.toggleKeyPad} 
                value={value} />,
            show && 
                <KeyPadWrapper key='key-pad-wrapper'>
                    <KeyPad 
                        hideKeyPad={this.toggleKeyPad} 
                        specialKeys={['-', '.', '<-']} />
                </KeyPadWrapper>
        ])
    }
}

Number.PropTypes = {
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string
}

export default Number