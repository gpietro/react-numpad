import React from 'react';
import PropTypes from 'prop-types';
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

const Wrapper = props => (
  <BackgroundPanel>
    <Container>{props.children}</Container>
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
