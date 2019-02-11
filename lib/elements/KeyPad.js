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
  keyValidator,
  dateFormat,
  formatInputValue,
  value,
  sync,
  update,
}) => {
  useEffect(() => {
    document.addEventListener('keydown', keyDown);
    return function cleanup() {
      document.removeEventListener('keydown', keyDown);
    };
  });

  const [input, setInput] = useState(formatInputValue(value));
  const [prevProps, setPrevProps] = useState();
  const numericKeys = [...Array(10).keys()];

  if (sync && prevProps !== input && validation(input, dateFormat)) {
    setPrevProps(input);
    update(displayRule(input, dateFormat));
  }

  const cancelLastInsert = () => {
    setInput(input.slice(0, -1));
  };

  function lastInput() {
    return input;
  }

  const keyDown = event => {
    event.preventDefault();
    const { key } = event;
    if (['Enter', 'Tab'].includes(key) && validation(input, dateFormat)) {
      confirm(displayRule(input, dateFormat));
    } else if (key === 'Backspace') {
      cancelLastInsert();
    } else if (['Escape', 'Tab'].includes(key)) {
      cancel();
    } else if (numericKeys.includes(parseInt(key, 10)) || key === '.' || key === '-') {
      handleClick(key);
    }
  };

  const handleClick = key => {
    if (keyValid(input, key, keyValidator || dateFormat)) {
      if (key === '-') {
        setInput(input.charAt(0) === '-' ? input.substr(1) : `-${input}`);
      } else {
        setInput(input + key);
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
        <NButton
          onClick={() => confirm(displayRule(input, dateFormat))}
          disabled={!validation(input, dateFormat)}
        >
          {validation(input, dateFormat) ? <IconCheckCircle /> : <IconCheck />}
        </NButton>
      </Header>
      <Display
        value={input}
        displayRule={displayRule}
        dateFormat={dateFormat}
        cancel={cancelLastInsert}
      />
      <Keys>
        {[7, 8, 9, 4, 5, 6, 1, 2, 3, '-', 0, '.'].map(key => (
          <Button
            key={`button-${key}`}
            theme={theme}
            click={clickedKey => handleClick(clickedKey)}
            value={key}
            disabled={!keyValid(input, key, keyValidator || dateFormat)}
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
  keyValidator: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  dateFormat: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  sync: PropTypes.bool,
  formatInputValue: PropTypes.func.isRequired,
};

KeyPad.defaultProps = {
  label: undefined,
  theme: undefined,
  dateFormat: '',
  keyValidator: undefined,
  value: '',
  sync: false,
  cancel: () => console.warn('cancel callback is undefined.'),
};

export default onClickOutside(KeyPad, {
  handleClickOutside: instance => evt => {
    evt.preventDefault();
    evt.stopPropagation();
    console.log('instance', instance, KeyPad);
    const {
      props: { validation, confirm },
    } = instance;
    // if (validation(input, dateFormat)) {
    //   confirm(displayRule(input, dateFormat));
    // } else {
    //   cancel();
    // }
  },
});

// function useClickOutside(ref, callback) {
//   const handleClick = e => {
//     const el = ref.current;
//     if (el && !el.contains(e.target)) callback();
//   };

//   useEffect(() => {
//     document.addEventListener("click", handleClick);

//     return () => {
//       document.removeEventListener("click", handleClick);
//     };
//   });
// }
