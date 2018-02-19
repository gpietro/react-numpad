import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Color from 'color';

const BackgroundPanel = styled.div`
  position: fixed;
  padding: 0;
  margin: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  font-size: 1em;
  align-items: ${props => props.theme.position};
  font-family: ${props => (props.theme.fontFamily ? `${props.theme.fontFamily},` : '')} Arial,
    sans-serif, Helvetica;
`;

const Content = styled.div`
  ${props =>
    ['startTopLeft', 'startTopRight', 'startBottomLeft', 'startBottomRight'].includes(
      props.theme.position
    )
      ? `
    position: fixed;
    top: ${props.theme.coords.top};
    left: ${props.theme.coords.left};
    bottom: ${props.theme.coords.bottom};
    right: ${props.theme.coords.right};
    height: 250px;`
      : `display: flex;
      width: 100%;
      justify-content: center;
      align-items: ${props.theme.position};
      height: ${props.theme.position === 'center' ? '100vh' : '250px'};
      background-color: ${Color(props.theme.color.secondary)
        .alpha(0.6)
        .string()};`};
`;

const Wrapper = props => (
  <BackgroundPanel>
    <Container>
      <Content>{props.children}</Content>
    </Container>
  </BackgroundPanel>
);

Wrapper.displayName = 'Wrapper';

Wrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default Wrapper;
