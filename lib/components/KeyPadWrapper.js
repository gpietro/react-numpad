import React from 'react'
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
    height: 100vh;
    justify-content: flex-end;
    flex-direction: column;    
`

const Body = styled.div`
    width: 100%;
    height: 300px;
    background: rgba(255, 255, 0, 0.5);
`

const KeyPadWrapper = (props) => (
    <BackgroundPanel>
        <Container>
            <Body>
                {props.children}
            </Body>
        </Container>
    </BackgroundPanel>    
)

export default KeyPadWrapper