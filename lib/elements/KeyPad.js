import React, { useState, useEffect, forwardRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useOnClickOutside from 'use-onclickoutside';
import IconCheck from '@material-ui/icons/CheckSharp';
import IconClose from '@material-ui/icons/CloseSharp';
import Paper from '@material-ui/core/Paper';

import Button from './KeypadButton';
import Display from './Display';
import { media } from '../styles/media-templates';
import NButton from './ui';
import useKeyboardInput from '../hooks/useKeyboardInput';

const Content = styled(Paper)`
  display: flex;
  flex-direction: column;
  ${media.mobile`width: 100%;`} 
  
  ${props =>
    props.position === 'fullscreen'
      ? `
  width: 100vw;
  height: 100vh;
  font-size: 1.2em;
  `
      : `
      width: 264px;
    height: 300px;
  `}
  
  background: ${props => props.theme.body.backgroundColor};
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;  
`;

const Label = styled.div`
  overflow: hidden;
  font-size: 1.3em;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

// TODO use material-ui colors
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2px 4px;
  align-items: center;
  color: white;
  background: ${props => props.theme.header.backgroundColor};
  user-select: none;
`;

const Keys = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  background: ${props => props.theme.header.secondaryColor};
  button {
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;
  }
  button:nth-child(3n) {
    border-right: none;
  }
  button:nth-child(-n + 3) {
    border-top: 1px solid #ddd;
  }
`;

const KeyPad = forwardRef(function KeyPad(
  { displayRule, position, validation, label, confirm, cancel, keyValid, value, update, sync },
  ref
) {
  // @ts-ignore
  const keypadKeys = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '-', '0', '.'];
  const keyboardKeys = [...Array(10).keys()].map(v => v.toString());
  const [inputValue, setInputValue] = useState(value);
  const keyboard = useKeyboardInput(
    inputValue,
    keyboardKeys.filter(key => keyValid(inputValue, key))
  );

  function computeNextKey(newValue, key) {
    let computedValue;
    if (keyValid(inputValue, key)) {
      if (key === '-') {
        computedValue = inputValue.charAt(0) === '-' ? inputValue.substr(1) : `-${inputValue}`;
      } else if (key === '.') {
        const leadingZero = ['', '-'].includes(inputValue);
        computedValue = `${inputValue}${leadingZero ? '0' : ''}${key}`;
      } else {
        computedValue = newValue;
      }
      setInputValue(computedValue);
      if (sync) {
        update(computedValue);
      }
    }
  }

  useOnClickOutside(ref, e => {
    if (validation(inputValue)) {
      confirm(inputValue);
    } else {
      cancel();
    }
  });

  // Reload props.value into the state
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (keyboard.keyDownEvent) {
      /** useKeyBaordInput set null when initializing the initialValue to avoid this computation before validation  */
      if (['Enter', 'Tab'].includes(keyboard.keyDownEvent.key) && validation(keyboard.value)) {
        confirm(keyboard.value);
      } else if (['Escape'].includes(keyboard.keyDownEvent.key)) {
        cancel();
      } else if (['Backspace'].includes(keyboard.keyDownEvent.key)) {
        if (keyboard.keyDownEvent.ctrlKey || keyboard.keyDownEvent.altKey) {
          setInputValue('');
        } else {
          setInputValue(keyboard.value);
        }
      } else {
        computeNextKey(keyboard.value, keyboard.keyDownEvent.key);
      }
    }
  }, [keyboard.value, keyboard.keyDownEvent]);

  const onButtonClick = useCallback(
    clickedKey => keyboard.virtualInteraction(clickedKey.toString()),
    []
  );

  return (
    <Content position={position} ref={ref} square>
      <Header>
        <NButton>
          <IconClose onClick={cancel} />
        </NButton>
        <Label>{label}</Label>
        <NButton onClick={() => confirm(inputValue)} disabled={!validation(inputValue)}>
          <IconCheck />
        </NButton>
      </Header>
      <Display
        value={displayRule(inputValue)}
        backspace={() => keyboard.virtualInteraction('Backspace')}
        longPressBackspace={() => setInputValue('')}
      />
      <Keys>
        {keypadKeys.map(key => (
          <Button
            key={`button-${key}`}
            click={onButtonClick}
            value={key}
            disabled={!keyValid(inputValue, key)}
          />
        ))}
      </Keys>
    </Content>
  );
});

KeyPad.displayName = 'KeyPad'; // TODO: necessary?

KeyPad.propTypes = {
  label: PropTypes.string,
  confirm: PropTypes.func.isRequired,
  cancel: PropTypes.func,
  displayRule: PropTypes.func.isRequired,
  validation: PropTypes.func.isRequired,
  keyValid: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  sync: PropTypes.bool,
  update: PropTypes.func.isRequired,
  position: PropTypes.string.isRequired,
};

KeyPad.defaultProps = {
  label: undefined,
  value: '',
  sync: false,
  cancel: () => {},
};

export default KeyPad;
