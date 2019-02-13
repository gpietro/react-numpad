import React, { Fragment, useState, useCallback } from 'react';
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

const updateCoords = {
  startBottomLeft: coords => ({
    top: `${coords.bottom + window.pageYOffset}px`,
    left: `${coords.left + window.pageXOffset}px`,
  }),
  startBottomRight: coords => ({
    top: `${coords.bottom + window.pageYOffset}px`,
    right: `${window.innerWidth - coords.right + window.pageXOffset}px`,
  }),
  startTopLeft: coords => ({
    top: `${coords.top + window.pageYOffset - 300}px`,
    left: `${coords.left + window.pageXOffset}px`,
  }),
  startTopRight: coords => ({
    top: `${coords.top + window.pageYOffset - 300}px`,
    right: `${window.innerWidth - coords.right + window.pageXOffset}px`,
  }),
};

const NumPad = ({
  children,
  placeholder,
  label,
  theme,
  locale,
  markers,
  position,
  sync,
  customInput,
  onChange,
  value: valueFromProps,
}) => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState((valueFromProps || '').toString());
  const [preValue, setPreValue] = useState();
  const [inputCoords, setInputCoords] = useState();

  if (valueFromProps !== preValue) {
    setPreValue(valueFromProps);
    setValue((valueFromProps || '').toString());
  }

  const toggleKeyPad = useCallback(
    (coords = {}) => {
      setInputCoords(!show && updateCoords[position] ? updateCoords[position](coords) : undefined);
      setShow(!show);
    },
    [show, position]
  );

  const confirm = useCallback(
    value => {
      if (show) {
        onChange(value);
        setValue(value);
      }
      setShow(!show);
    },
    [value, show]
  );

  // Update internal state, if sync is true call the external onChange callback on each change
  const update = useCallback(
    value => {
      console.log('update value', value);
      setValue(value);
      if (sync) {
        onChange(value);
      }
    },
    [value]
  );

  const customTheme = typeof theme === 'object' ? theme : styles(theme);
  customTheme.position = position;
  customTheme.coords = inputCoords;

  const display = position !== 'flex-start' && position !== 'flex-end' ? show : true;
  const { transition, transitionProps } = getTransition(show, position);

  return (
    <Fragment>
      <GlobalStyle />
      <ThemeProvider theme={customTheme}>
        <InputField
          placeholder={placeholder}
          showKeyPad={toggleKeyPad}
          inputValue={value}
          label={label}
          disabled={show}
          customInput={customInput}
        />
      </ThemeProvider>
      <Portal>
        {display &&
          React.createElement(
            transition,
            transitionProps,
            <ThemeProvider theme={customTheme}>
              <Wrapper show>
                {React.cloneElement(children, {
                  cancel: toggleKeyPad,
                  confirm,
                  update,
                  value,
                  label,
                  locale,
                  markers,
                  sync,
                })}
              </Wrapper>
            </ThemeProvider>
          )}
      </Portal>
    </Fragment>
  );
};

NumPad.defaultProps = {
  children: undefined,
  customInput: undefined,
  placeholder: undefined,
  position: 'flex-end',
  label: undefined,
  theme: undefined,
  locale: 'en',
  value: '',
  sync: false,
  markers: [],
};

NumPad.propTypes = {
  onChange: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.element)]),
  customInput: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  placeholder: PropTypes.string,
  position: PropTypes.string,
  label: PropTypes.string,
  locale: PropTypes.string,
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  sync: PropTypes.bool,
};

export default NumPad;
