import React from 'react';
import { ThemeProvider } from 'styled-components';
import styles from '../styles';
import { Content } from '../elements/Wrapper';

export default ({ theme, position, onChange = () => {}, children }) => {
  const customTheme = typeof theme === 'object' ? theme : styles(theme);
  customTheme.position = position;
  return (
    <ThemeProvider theme={customTheme}>
      <Content>
        {React.cloneElement(children, {
          update: onChange,
          confirm: onChange,
        })}
      </Content>
    </ThemeProvider>
  );
};
