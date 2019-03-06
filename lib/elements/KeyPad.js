import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import onClickOutside from 'react-onclickoutside';
import IconCheck from 'react-icons/lib/md/check';
import IconCheckCircle from 'react-icons/lib/md/check-circle';
import IconCancel from 'react-icons/lib/md/close';

import Button from './KeypadButton';
import Display from './Display';
import { media } from '../styles/media-templates';
import NButton from './ui';
import useKeyboardInput from '../hooks/useKeyboardInput';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 264px;
  ${media.mobile`width: 100%;`} height: 300px;
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
  padding: 2px 5px;
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

const KeyPad = ({
  displayRule,
  validation,
  label,
  confirm,
  cancel,
  keyValid,
  value,
  update,
  sync,
}) => {
  // @ts-ignore
  const validKeys = [...Array(10).keys()].map(v => v.toString());
  const [inputValue, setInputValue] = useState(value);
  const keyboard = useKeyboardInput(inputValue, validKeys);

  // Reload props.value into the state
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  function computeNextKey(newValue, key) {
    let computedValue = inputValue;
    if (key === '-') {
      computedValue = inputValue.charAt(0) === '-' ? inputValue.substr(1) : `-${newValue}`;
    } else if (key === '.' && keyValid(inputValue, key)) {
      computedValue = (newValue === '' ? '0' : newValue) + key;
    } else if (keyValid(newValue.slice(0, -1), key)) {
      computedValue = newValue;
    } else {
      keyboard.virtualInteraction('Backspace');
    }
    setInputValue(computedValue);
    if (sync) {
      update(computedValue);
    }
  }

  useEffect(() => {
    if (keyboard.keyDownEvent) {
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
  }, [keyboard.value]);

  return (
    <Content>
      <Header>
        <NButton onClick={cancel}>
          <IconCancel />
        </NButton>
        <Label>{label}</Label>
        <NButton onClick={() => confirm(inputValue)} disabled={!validation(inputValue)}>
          {validation(inputValue) ? <IconCheckCircle /> : <IconCheck />}
        </NButton>
      </Header>
      <Display
        value={displayRule(inputValue)}
        backspace={() => keyboard.virtualInteraction('Backspace')}
        longPressBackspace={() => setInputValue('')}
      />
      <Keys>
        {[7, 8, 9, 4, 5, 6, 1, 2, 3, '-', 0, '.'].map(key => (
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
};

KeyPad.displayName = 'KeyPad';

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

export default onClickOutside(KeyPad, {
  handleClickOutside: instance => evt => {
    evt.preventDefault();
    evt.stopPropagation();
    const {
      props: { value, validation, confirm, cancel },
    } = instance;
    if (validation(value)) {
      confirm(value);
    } else {
      cancel();
    }
  },
});
