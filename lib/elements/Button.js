import React from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider } from 'styled-components'
import styles from '../styles'

const Button = styled.button`
  background: ${props => props.theme.background}; 
  border: none;
  color: ${props => props.theme.color};
  cursor: pointer;
  display: inline-block;
  line-height: 40px;
  font-weight: 200;
  margin: 3px 0;
  outline: none;
  padding: 0 12px;
  border-radius: 2px;
  transition:
    transform 0.08s ease,
    background-color 0.08s ease,
    box-shadow 0.08s ease;

  &:active {
    transform: translateY(1.5px);
    box-shadow: 
        inset 0 -0.5px 0 #aaaaaa,
    inset 0px -1px 1px -1px #fff,
        0px 0.5px 0.75px 0px #999;
  }
`

const ButtonWrapper = ({theme}) => (
  <ThemeProvider theme={styles[theme].button.primary}>
    <Button>Ciao</Button>
  </ThemeProvider>
)


ButtonWrapper.propTypes = {
  theme: PropTypes.string.isRequired  
}
ButtonWrapper.defaultProps = {
  theme: 'basic'
}

export default ButtonWrapper