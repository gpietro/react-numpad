import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import styled from 'styled-components'

const BackgroundPanel = styled.div`
    position:fixed;
    padding:0;
    margin:0;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
`

const Container = styled.div`
    display: flex;
    height: 100vh;
    justify-content: flex-end;
    flex-direction: column;    
`

const KeyPadWrapper = (props) => (
    <BackgroundPanel>
        <Container>
            <ReactCSSTransitionGroup
                transitionName="keypad"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnter={false}
                transitionLeave={false}>
                {props.children}
            </ReactCSSTransitionGroup>
        </Container>
    </BackgroundPanel>    
)

export default KeyPadWrapper