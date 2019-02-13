import React, { useState, useEffect, useCallback } from 'react';
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
import { useKeyPress } from '../hooks';

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
  theme,
  keyValid,
  formatInputValue,
  value,
  update,
}) => {
  // TODO verify formatInputValue
  console.log('display', displayRule(value), 'value', value)  
  const numericKeys = [...Array(10).keys()];
  useKeyPress(event => {
    if (['Enter', 'Tab'].includes(event.key) && validation(value)) {
      confirm(value);
    } else if (event.key === 'Backspace') {
      update(value.slice(0, -1));
    } else if (['Escape', 'Tab'].includes(event.key)) {
      cancel();
    } else if (
      numericKeys.includes(parseInt(event.key, 10)) ||
      event.key === '.' ||
      event.key === '-'
    ) {
      handleClick(event.key);
    }
  });

  const handleClick = key => {
    if (keyValid(value, key)) {
      if (key === '-') {
        update(value.charAt(0) === '-' ? value.substr(1) : `-${value}`);
      } else {
        update(value + key);
      }
    }
  };

  return (
    <Content>
      <Header>
        <NButton onClick={cancel}>
          <IconCancel />
        </NButton>
        <Label>{label}</Label>
        <NButton onClick={() => confirm(value)} disabled={!validation(value)}>
          {validation(value) ? <IconCheckCircle /> : <IconCheck />}
        </NButton>
      </Header>
      <Display value={displayRule(value)} cancel={() => update(value.slice(0, -1))} />
      <Keys>
        {[7, 8, 9, 4, 5, 6, 1, 2, 3, '-', 0, '.'].map(key => (
          <Button
            key={`button-${key}`}
            theme={theme}
            click={clickedKey => handleClick(clickedKey)}
            value={key}
            disabled={!keyValid(value, key)}
          />
        ))}
      </Keys>
    </Content>
  );
};

KeyPad.displayName = 'KeyPad';

KeyPad.propTypes = {
  label: PropTypes.string,
  theme: PropTypes.object,
  confirm: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  displayRule: PropTypes.func.isRequired,
  validation: PropTypes.func.isRequired,
  keyValid: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  sync: PropTypes.bool,
  formatInputValue: PropTypes.func.isRequired,
};

KeyPad.defaultProps = {
  label: undefined,
  theme: undefined,
  value: '',
  sync: false,
  cancel: () => console.warn('cancel callback is undefined.'),
};

export default onClickOutside(KeyPad, {
  handleClickOutside: instance => evt => {
    evt.preventDefault();
    evt.stopPropagation();
    const {
      props: { value, validation, confirm, displayRule, cancel },
    } = instance;
    if (validation(value)) {
      confirm(value);
    } else {
      cancel();
    }
  },
});
