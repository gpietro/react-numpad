import React from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import styled from 'styled-components';

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
  height: 100vh;
  justify-content: flex-end;
  flex-direction: column;
`;

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
};

const Wrapper = props => (
  <BackgroundPanel>
    <Container>
      <Transition in={props.inProp} timeout={duration}>
        {state => (
          <div style={Object.assign({}, defaultStyle, transitionStyles[state])}>
            {props.children}
          </div>
        )}
      </Transition>
    </Container>
  </BackgroundPanel>
);

Wrapper.displayName = 'Wrapper';

Wrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  inProp: PropTypes.bool,
};

Wrapper.defaultProps = {
  inProp: false,
};

export default Wrapper;
