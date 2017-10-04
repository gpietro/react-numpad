import React, {Component} from 'react'

const wrapper = (WrappedComponent) => {
    class Wrapper extends Component {
        constructor(props) {
            super(props)
            this.state = { show: false, value: '' }
            this.toggleKeyPad = this.toggleKeyPad.bind(this)
        }

        toggleKeyPad(value, validation = () => true) {
            let updateValue = this.state.show && validation(value) ? {value} : {}
            this.setState((prevState) => (Object.assign({}, { show: !prevState.show }, updateValue)), () => this.props.onChange(value))
        }

        render() {
            return <WrappedComponent 
                {...this.props} 
                {...this.state} 
                toggleKeyPad={this.toggleKeyPad}
                validation={this.validation}
            />
        }
    }
    
    return Wrapper
}


class Test extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log('props', this.props, 'state', this.state)
        
        return (<div>ciao</div>)
    }
}

export default wrapper(Test);
