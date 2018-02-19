import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Portal } from 'react-portal';
import { injectGlobal, ThemeProvider } from 'styled-components';
import { InputField, Wrapper } from '../elements';
import globalCSS from '../styles/global-css';
import styles from '../styles';

injectGlobal`${globalCSS}`; // eslint-disable-line no-unused-expressions

export default ({ element, validation, displayRule, inputButtonContent, keyValid }) => {
  class NumPad extends Component {
    constructor(props) {
      super(props);
      this.state = {
        show: false,
        value: props.value.toString().replace(/\D+/g, ''),
        inputCoords: {},
      };
      this.toggleKeyPad = this.toggleKeyPad.bind(this);
      this.confirm = this.confirm.bind(this);
    }

    toggleKeyPad(coords = {}) {
      console.log('coords', coords);
      let updateCoords = { top: '', bottom: '', left: '', right: '' };
      const { position } = this.props;

      if (!this.state.show) {
        if (position === 'startBottomLeft') {
          updateCoords = { top: `${coords.bottom}px`, left: `${coords.left}px` };
        }
        if (position === 'startBottomRight') {
          updateCoords = {
            top: `${coords.bottom}px`,
            right: `${window.innerWidth - coords.right}px`,
          };
        }
        if (position === 'startTopLeft') {
          updateCoords = {
            bottom: `${window.innerHeight - coords.top}px`,
            left: `${coords.left}px`,
          };
        }
        if (position === 'startTopRight') {
          updateCoords = {
            bottom: `${window.innerHeight - coords.top}px`,
            right: `${window.innerWidth - coords.right}px`,
          };
        }
      }

      this.setState(prevState => ({ show: !prevState.show, inputCoords: updateCoords }));
    }

    confirm(value) {
      let updateValue = {};
      const { dateFormat } = this.props;
      if (this.state.show && validation(value)) {
        updateValue = { value };
        this.props.onChange(displayRule(value, dateFormat));
      }
      this.setState(prevState => Object.assign({}, { show: !prevState.show }, updateValue));
    }

    render() {
      const { show, value, inputCoords } = this.state;
      const {
        placeholder,
        label,
        theme,
        dateFormat,
        locale,
        minDate,
        maxDate,
        position,
      } = this.props;
      const customTheme = typeof theme === 'object' ? theme : styles(theme);
      customTheme.position = position;
      customTheme.coords = inputCoords;

      return (
        <Fragment>
          <ThemeProvider theme={customTheme}>
            <InputField
              placeholder={placeholder}
              showKeyPad={this.toggleKeyPad}
              inputValue={value}
              dateFormat={dateFormat}
              displayRule={displayRule}
              label={label}
              disabled={this.state.show}
              buttonContent={inputButtonContent}
              getPosition={this.getPosition}
            >
              {this.props.children}
            </InputField>
          </ThemeProvider>
          {show && (
            <Portal>
              <ThemeProvider theme={customTheme}>
                <Wrapper>
                  {React.createElement(
                    element,
                    {
                      cancel: this.toggleKeyPad,
                      confirm: this.confirm,
                      displayRule,
                      validation,
                      keyValid,
                      label,
                      locale,
                      dateFormat,
                      minDate,
                      maxDate,
                      value,
                    },
                    null
                  )}
                </Wrapper>
              </ThemeProvider>
            </Portal>
          )}
        </Fragment>
      );
    }
  }

  NumPad.defaultProps = {
    children: undefined,
    placeholder: undefined,
    position: 'flex-end',
    label: undefined,
    theme: undefined,
    dateFormat: 'MM/DD/YYYY',
    locale: 'en',
    value: '',
    minDate: undefined,
    maxDate: undefined,
  };

  NumPad.propTypes = {
    onChange: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.element)]),
    placeholder: PropTypes.string,
    position: PropTypes.string,
    label: PropTypes.string,
    locale: PropTypes.string,
    theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    dateFormat: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    minDate: PropTypes.string,
    maxDate: PropTypes.string,
  };

  return NumPad;
};
