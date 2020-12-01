import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import styles from '../styles';
import { Content } from '../elements/Wrapper';

const StaticWrapper = ({ theme, position, onChange, displayRule, sync, children, locale, value: valueFromProps }) => {
  const contentRef = useRef();
  const customTheme = typeof theme === 'object' ? theme : styles(theme);

  const confirm = useCallback(val => {
    onChange(displayRule(val));
  }, []);

  // Update internal state, if sync is true call the external onChange callback on each change
  const update = useCallback(
    val => {
      if (sync) {
        onChange(displayRule(val));
      }
    },
    [sync]
  );

  return (
    <ThemeProvider theme={customTheme}>
      <Content position={position}>
        {React.cloneElement(children, {
          update,
          confirm,
          locale,
          position,
          ref: contentRef,
          value: valueFromProps.toString()
        })}
      </Content>
    </ThemeProvider>
  );
};

StaticWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.element)]),
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  position: PropTypes.string,
  locale: PropTypes.string,
  sync: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  displayRule: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

StaticWrapper.defaultProps = {
  theme: undefined,
  position: undefined,
  children: undefined,
  sync: false,
  locale: 'en',
  value: ''
};

export default StaticWrapper;
