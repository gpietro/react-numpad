import React, { useState, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useOnClickOutside from 'use-onclickoutside';
import { MdCheck, MdCheckCircle, MdCancel } from 'react-icons/md';

import Button from './KeypadButton';
import Display from './Display';
import { media } from '../styles/media-templates';
import NButton from './ui';
import useKeyboardInput from '../hooks/useKeyboardInput';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  ${media.mobile`width: 100%;`} 
  
  ${props =>
    props.theme.position === 'fullscreen'
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
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 45px, rgba(0, 0, 0, 0.22) 0px 10px 18px;
`;

const Label = styled.div`
  overflow: hidden;
  font-size: 1.3em;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2px 4px;
  align-items: center;
  color: ${props => props.theme.header.secondaryColor};
  background: ${props => props.theme.header.backgroundColor};
  user-select: none;
`;

const Keys = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
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
  { displayRule, validation, label, confirm, cancel, keyValid, value, update, sync },
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

  useOnClickOutside(ref, () => {
    if (validation(value)) {
      confirm(value);
    } else {
      cancel();
    }
  });

  // Reload props.value into the state
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  function computeNextKey(newValue, key) {
    let computedValue;
    if (keyValid(inputValue, key)) {
      if (key === '-') {
        computedValue = inputValue.charAt(0) === '-' ? inputValue.substr(1) : `-${inputValue}`;
      } else if (key === '.') {
        computedValue = (inputValue === '' ? '0' : inputValue) + key;
      } else {
        computedValue = newValue;
      }
      setInputValue(computedValue);
      if (sync) {
        update(computedValue);
      }
    }
  }

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

  return (
    <Content ref={ref}>
      <Header>
        <NButton>
          <MdCancel onClick={cancel} />
        </NButton>
        <Label>{label}</Label>
        <NButton onClick={() => confirm(inputValue)} disabled={!validation(inputValue)}>
          {validation(inputValue) ? <MdCheckCircle /> : <MdCheck />}
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
            click={clickedKey => keyboard.virtualInteraction(clickedKey.toString())}
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
  cancel: PropTypes.func.isRequired,
  displayRule: PropTypes.func.isRequired,
  validation: PropTypes.func.isRequired,
  keyValid: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  sync: PropTypes.bool,
  update: PropTypes.func.isRequired,
};

KeyPad.defaultProps = {
  label: undefined,
  value: '',
  sync: false,
};

export default KeyPad;
