import React, {Component} from 'react'
import PropTypes from 'prop-types'
import InputField from './InputField'
import KeyPadWrapper from './KeyPadWrapper'
import KeyPad from './KeyPad'

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
            show ? <KeyPadWrapper><KeyPad hideKeyPad={this.toggleKeyPad}/></KeyPadWrapper> : null
        ])
    }
}

export default NumPad