import React from 'react';
import { ThemeProvider } from 'styled-components';
import styles from '../styles';

export default ({ theme, position, onChange, children }) => {
    const customTheme = typeof theme === 'object' ? theme : styles(theme);
    customTheme.position = position;
    return (
      <ThemeProvider theme={customTheme}>
        { React.cloneElement(children, {
            confirm: onChange
        })}        
      </ThemeProvider>)
  }
  