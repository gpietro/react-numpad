import React from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider } from 'styled-components'
import styles from '../styles'

const Button = styled.button`
  background: ${props => props.theme.background}; 
  border: ${props => props.theme.border};
  color: ${props => props.theme.color};
  cursor: pointer;
  display: inline-block;
  line-height: 40px;
  min-height: 49px;
  font-size: ${props => props.theme.fontSize};
  font-weight: ${props => props.theme.fontWeight};
  margin: '3px 0';
  outline: none;
  padding: 0 12px;
  border-radius: ${props => props.theme.borderRadius};
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

const ButtonWrapper = ({theme, value, click, className, disabled}) => (
  <ThemeProvider theme={styles[theme].button.primary}>
    <Button onClick={() => click(value)} className={className} disabled={disabled}>{value}</Button>
  </ThemeProvider>
)


ButtonWrapper.propTypes = {
  theme: PropTypes.string.isRequired,
  click: PropTypes.func.isRequired, 
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  className: PropTypes.string,
  disabled: PropTypes.bool
}
ButtonWrapper.defaultProps = {
  theme: 'basic'
}

export default ButtonWrapper