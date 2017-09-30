import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { injectGlobal } from 'styled-components'
import globalCSS from '../styles/global'
import InputField from './InputField'
import KeyPadWrapper from './KeyPadWrapper'
import KeyPad from './KeyPad'

injectGlobal`${ globalCSS }`

class NumPad extends Component {
    constructor(props) {
        super(props)
        this.state = { show: false }
        this.toggleKeyPad = this.toggleKeyPad.bind(this)
    }

    toggleKeyPad() {
        this.setState((prevState) => ({show: !prevState.show}), () => console.log('show', this.state.show))
    }
    
    render() {
        const { placeholder } = this.props
        const { show } = this.state

        return ([
            <InputField key='input-field' placeholder={placeholder} showKeyPad={this.toggleKeyPad} />,
            show && <KeyPadWrapper key='key-pad-wrapper'><KeyPad hideKeyPad={this.toggleKeyPad}/></KeyPadWrapper>
        ])
    }
}

export default NumPad