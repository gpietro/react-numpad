import React, {Component} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import styled from 'styled-components';
import onClickOutside from 'react-onclickoutside'

const Body = styled.div`
    width: 100%;
    height: 250px;
    background-color: rgba(50,165,242,0.9);
`

class BodyWrapper extends Component {
    handleClickOutside(evt) {
        evt.preventDefault()
        evt.stopPropagation()        
        this.props.cancel()
    }

    render() {
        return (
            <Body>{this.props.children}</Body>
        )
    }
}

export default onClickOutside(BodyWrapper)