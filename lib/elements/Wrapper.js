import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Color from 'color';
import { media } from '../styles/media-templates';

const BackgroundPanel = styled.div`
  ${props =>
    props.theme.coords
      ? ``
      : `
  position: fixed;
  padding: 0;
  margin: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;  
`};
`;

const Container = styled.div`
  display: flex;
  width: ${props => (props.width ? props.width : '100%')};
  height: 100%;
  align-items: ${props => props.position};
  justify-content: center;
  * > ::-webkit-scrollbar {
    width: 4px;
  }

  /* Track */
  * > ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  * > ::-webkit-scrollbar-thumb {
    background: #546e7a;
  }
`;

const Backdrop = styled.div`
  width: ${props => (props.width ? props.width : '100%')};
  ${props =>
    props.theme.coords
      ? `height: 300px;
    `
      : `height: ${props.position === 'center' ? '100vh' : '300px'}
      background-color: ${Color('#000')
        .alpha(0.4)
        .string()};
      `}
`;

const Content = styled.div`
  * {
    font-family: ${props => props.theme.global.fontFamily};
  }
  font-size: 1em;
  z-index: 10000;
  ${props => (props.position === 'center' ? 'height: 100vh' : '')}
  ${props =>
    props.theme.coords
      ? `
    position: absolute;
    top: ${props.theme.coords.top};    
    bottom: ${props.theme.coords.bottom};    
    `
      : `
    display: flex;    
    
    justify-content: center;
    align-items: ${props.position};
  `};
  ${media.desktop`left: ${props => (props.theme.coords ? props.theme.coords.left : 0)};`}
  ${media.desktop`right: ${props => (props.theme.coords ? props.theme.coords.right : 0)};`}
  ${media.mobile`left: 0;`}
  ${media.mobile`right: auto;`}
  ${media.mobile`width: 100wv;`}
  `;

const Wrapper = ({ position, children }) => (
  <BackgroundPanel>
    <Container position={position}>
      {position.startsWith('start') || position === 'fullscreen' ? (
        <Content position={position}>{children}</Content>
      ) : (
        <Backdrop position={position}>
          <Content position={position}>{children}</Content>
        </Backdrop>
      )}
    </Container>
  </BackgroundPanel>
);

Wrapper.displayName = 'Wrapper';

Wrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  position: PropTypes.string.isRequired,
};

export default Wrapper;
export { Container, Content };
