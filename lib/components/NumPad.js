import React, { useState, useLayoutEffect, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Portal } from 'react-portal';
import { ThemeProvider } from 'styled-components';
import Slide from '@material-ui/core/Slide';
import { InputField, Wrapper } from '../elements';

import GlobalStyle from '../styles/global-css';
import styles from '../styles';

const getTransition = (show, position) => {
  let transition = Slide;
  let transitionProps = {
    in: show,
    direction: 'up',
    mountOnEnter: true,
    unmountOnExit: true,
  };
  if (position === 'flex-start') {
    transitionProps.direction = 'down';
  }
  if (position !== 'flex-start' && position !== 'flex-end') {
    transition = 'span';
    transitionProps = {};
  }
  return { transition, transitionProps };
};

const NumPad = ({
  children,
  placeholder,
  label,
  disabled,
  theme,
  locale,
  markers,
  position,
  sync,
  customInput,
  onChange,
  value: valueFromProps,
  formatInputValue,
  displayRule,
}) => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState(formatInputValue(valueFromProps));
  const [preValue, setPreValue] = useState();
  const [customTheme, setCustomTheme] = useState({});

  const inputRef = useRef();
  const contentRef = useRef();

  useEffect(() => {
    if (show && value !== formatInputValue(valueFromProps)) {
      setValue(formatInputValue(valueFromProps));
    }
  }, [show]);

  if (valueFromProps !== preValue) {
    setPreValue(valueFromProps);
    setValue(formatInputValue(valueFromProps));
  }

  const toggleKeyPad = () => setShow(!show);

  const confirm = useCallback(
    val => {
      if (show) {
        onChange(displayRule(val));
      }
      setShow(!show);
    },
    [show]
  );

  // Update internal state, if sync is true call the external onChange callback on each change
  const update = useCallback(
    val => {
      setValue(val);
      if (sync) {
        onChange(displayRule(val));
      }
    },
    [sync]
  );

  useLayoutEffect(() => {
    if (contentRef.current) {
      const { width, height } = contentRef.current.getBoundingClientRect();
      const { top, bottom, left, right } = inputRef.current.getBoundingClientRect();
      const { innerWidth, innerHeight, pageXOffset, pageYOffset } = window;

      const newCoords = {
        startBottomLeft: {
          top: `${Math.min(innerHeight - height, bottom + pageYOffset)}px`,
          left: `${Math.min(innerWidth - width, left + pageXOffset)}px`,
        },
        startBottomRight: {
          top: `${Math.min(innerHeight - height, bottom + pageYOffset)}px`,
          right: `${Math.min(innerWidth - right + pageXOffset, innerWidth - width)}px`,
        },
        startTopLeft: {
          top: `${Math.max(top + pageYOffset - height, 0)}px`,
          left: `${Math.min(innerWidth - width, left + pageXOffset)}px`,
        },
        startTopRight: {
          top: `${Math.max(top + pageYOffset - height, 0)}px`,
          right: `${Math.min(innerWidth - right + pageXOffset, innerWidth - width)}px`,
        },
      }[position];
      setCustomTheme({ ...customTheme, coords: newCoords });
    } else {
      const newTheme = typeof theme === 'object' ? theme : styles(theme);
      setCustomTheme(newTheme);
    }
  }, [show]);

  const display = position !== 'flex-start' && position !== 'flex-end' ? show : true;
  const { transition, transitionProps } = getTransition(show, position);

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={customTheme}>
        <InputField
          placeholder={placeholder}
          showKeyPad={toggleKeyPad}
          inputValue={valueFromProps.toString()}
          label={label}
          disabled={show || disabled}
          customInput={customInput}
          ref={inputRef}
        />
      </ThemeProvider>
      <Portal>
        {display &&
          React.createElement(
            transition,
            transitionProps,
            <ThemeProvider theme={customTheme}>
              <Wrapper show position={position}>
                {React.cloneElement(children, {
                  cancel: toggleKeyPad,
                  confirm,
                  update,
                  value,
                  position,
                  label,
                  locale,
                  markers,
                  sync,
                  ref: contentRef,
                })}
              </Wrapper>
            </ThemeProvider>
          )}
      </Portal>
    </>
  );
};

NumPad.defaultProps = {
  children: undefined,
  customInput: undefined,
  placeholder: undefined,
  position: 'center',
  formatInputValue: value => value.toString(),
  label: undefined,
  theme: undefined,
  locale: 'en',
  value: '',
  sync: false,
  markers: [],
  disabled: false,
};

NumPad.propTypes = {
  onChange: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.element)]),
  customInput: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  placeholder: PropTypes.string,
  position: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  locale: PropTypes.string,
  formatInputValue: PropTypes.func,
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  sync: PropTypes.bool,
  markers: PropTypes.arrayOf(PropTypes.string),
  displayRule: PropTypes.func.isRequired,
};

export default NumPad;
