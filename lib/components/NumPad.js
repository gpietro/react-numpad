import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Portal } from 'react-portal';
import { injectGlobal, ThemeProvider } from 'styled-components';
import { InputField, Wrapper } from '../elements';
import globalCSS from '../styles/global-css';
import styles from '../styles';

injectGlobal(`${globalCSS}`);

export default ({
  element,
  validation,
  displayRule,
  inputButtonContent,
  keyValid,
}) => {
  class NumPad extends Component {
    constructor(props) {
      super(props);
      this.state = {
        show: false,
        value: props.defaultValue.toString().replace(/\D+/g, ''),
      };
      this.toggleKeyPad = this.toggleKeyPad.bind(this);
      this.confirm = this.confirm.bind(this);
    }

    toggleKeyPad() {
      this.setState(prevState => ({ show: !prevState.show }));
    }

    confirm(value) {
      let updateValue = {};
      if (this.state.show && validation(value)) {
        updateValue = { value };
        this.props.onChange(value);
      }
      this.setState(prevState =>
        Object.assign({}, { show: !prevState.show }, updateValue)
      );
    }

    render() {
      const { show, value } = this.state;
      const {
        placeholder,
        label,
        theme,
        dateFormat,
        className,
        locale,
      } = this.props;

      return (
        <div className={className}>
          <ThemeProvider key="input-field" theme={styles(theme)}>
            <InputField
              placeholder={placeholder}
              showKeyPad={this.toggleKeyPad}
              value={value}
              dateFormat={dateFormat}
              displayRule={displayRule}
              label={label}
              disabled={this.state.show}
              buttonContent={inputButtonContent}
            >
              {this.props.children}
            </InputField>
          </ThemeProvider>
          {show && (
            <Portal>
              <ThemeProvider key="key-pad" theme={styles(theme)}>
                <Wrapper inProp={show}>
                  {React.createElement(
                    element,
                    {
                      cancel: this.toggleKeyPad,
                      confirm: this.confirm,
                      displayRule,
                      validation,
                      keyValid,
                      label,
                      value,
                      locale,
                    },
                    null
                  )}
                </Wrapper>
              </ThemeProvider>
            </Portal>
          )}
        </div>
      );
    }
  }

  NumPad.defaultProps = {
    className: undefined,
    children: undefined,
    placeholder: undefined,
    label: undefined,
    theme: undefined,
    dateFormat: undefined,
    defaultValue: '',
  };

  NumPad.propTypes = {
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.element),
    ]),
    placeholder: PropTypes.string,
    label: PropTypes.string,
    theme: PropTypes.string,
    dateFormat: PropTypes.string,
    defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  };

  return NumPad;
};
