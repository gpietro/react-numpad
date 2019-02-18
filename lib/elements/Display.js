import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MdBackspace from 'react-icons/lib/md/backspace';
import useLongPress from '../hooks/useLongPress';

const Wrapper = styled.div`
  display: flex;
  padding: 2px 5px 5px 8px;
  align-items: center;
  border: none;
  background: white;
`;

const Backspace = styled.button`
  background: none;
  cursor: default;
  border: none;
  outline: none;
  font-size: 1.6em;
  padding: 0px 2px 0px 0px;
  color: ${props => props.theme.header.primaryColor};
`;

const Input = styled.input`
  &:read-only {
    cursor: not-allowed;
  }
  border-radius: 0px;
  cursor: default;
  background: transparent;
  font-size: 1.3em;
  outline: none;
  border: none;
  width: 100%;
`;
const Display = styled.div`
  flex-grow: 1;
`;

const DisplayWrapper = ({ value, backspace, longPressBackspace }) => {
  const backspaceLongPress = useLongPress(longPressBackspace, 1000);

  return (
    <Wrapper>
      <Display>
        <Input value={value} readOnly autoFocus />
      </Display>
      <Backspace {...backspaceLongPress} onClick={backspace}>
        <MdBackspace />
      </Backspace>
    </Wrapper>
  );
};

DisplayWrapper.propTypes = {
  value: PropTypes.string.isRequired,
  backspace: PropTypes.func,
  longPressBackspace: PropTypes.func,
};

DisplayWrapper.defaultProps = {
  backspace: () => {},
  longPressBackspace: () => {},
};

export default DisplayWrapper;
