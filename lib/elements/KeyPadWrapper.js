import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import styled from 'styled-components';

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
    
    background: rgba(255, 0, 255, 0.5);
    height: 100vh;
    justify-content: flex-end;
    flex-direction: column;    
`

const Body = styled.div`
    width: 100%;
    height: 240px;
    background-color: #e3e3e3;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
`

const KeyPadWrapper = (props) => (
    <BackgroundPanel onClick={console.log('clicked me')}>
        <Container>
            <ReactCSSTransitionGroup
                transitionName="keypad"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnter={false}
                transitionLeave={false}>
                <Body>
                    {props.children}
                </Body>
            </ReactCSSTransitionGroup>
        </Container>
    </BackgroundPanel>    
)

export default KeyPadWrapper