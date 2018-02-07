import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Color from 'color';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FlatButton from 'material-ui/FlatButton';

const Button = styled.button`
  color: ${props => props.theme.color.primary};
  width: 80px;
  background: none;
  border: none;
  cursor: pointer;
  display: inline-block;
  line-height: 40px;
  font-size: 1.2em;
  font-weight: 400;
  margin: 0;
  padding: 0 12px;
  border-radius: 0;
  :active {
    transition: all 150ms linear;
    opacity: 0.75;
  }
  :active,
  :focus {
    outline: none;
  }
  :disabled {
    color: ${props =>
      Color(props.theme.color.primary)
        .alpha(0.4)
        .string()};
    cursor: not-allowed;
  }
`;

Button.displayName = 'Button';

const muiTheme = getMuiTheme({
  flatButton: {
    fontSize: '1.2em',
  },
});

const ButtonWrapper = ({ value, click, disabled }) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <FlatButton label={`${value}`} onClick={() => click(value)} disabled={disabled} />
  </MuiThemeProvider>
);

ButtonWrapper.defaultProps = {
  value: undefined,
  disabled: false,
};

ButtonWrapper.propTypes = {
  click: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
};

export default ButtonWrapper;
