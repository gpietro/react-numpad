import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import styles from '../styles';
import { Content } from '../elements/Wrapper';

const StaticWrapper = ({ theme, position, onChange, displayRule, sync, children }) => {
  const contentRef = useRef();
  const customTheme = typeof theme === 'object' ? theme : styles(theme);
  customTheme.position = position;

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
      <Content>
        {React.cloneElement(children, {
          update,
          confirm,
          ref: contentRef,
        })}
      </Content>
    </ThemeProvider>
  );
};

StaticWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.element)]),
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  position: PropTypes.string,
  sync: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  displayRule: PropTypes.func.isRequired,
};

StaticWrapper.defaultProps = {
  theme: undefined,
  position: undefined,
  children: undefined,
  sync: false,
};

export default StaticWrapper;
