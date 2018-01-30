import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Portal } from 'react-portal';
import { injectGlobal, ThemeProvider } from 'styled-components';
import { InputField, Wrapper } from '../elements';
import globalCSS from '../styles/global-css';
import styles from '../styles';

injectGlobal`${globalCSS}`;

export default ({ element, validation, displayRule, inputButtonContent, keyValid }) => {
  class NumPad extends Component {
    constructor(props) {
      super(props);
      this.state = { show: false, value: props.value.toString().replace(/\D+/g, '') };
      this.toggleKeyPad = this.toggleKeyPad.bind(this);
      this.confirm = this.confirm.bind(this);
    }

    toggleKeyPad() {
      this.setState(prevState => ({ show: !prevState.show }));
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
      const { show, value } = this.state;
      const { placeholder, label, theme, dateFormat, locale, minDate, maxDate } = this.props;

      return (
        <Fragment>
          <ThemeProvider key="input-field" theme={styles(theme)}>
            <InputField
              placeholder={placeholder}
              showKeyPad={this.toggleKeyPad}
              inputValue={value}
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
    label: undefined,
    theme: undefined,
    dateFormat: undefined,
    locale: 'en',
    value: '',
    minDate: undefined,
    maxDate: undefined,
  };

  NumPad.propTypes = {
    onChange: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.element)]),
    placeholder: PropTypes.string,
    label: PropTypes.string,
    locale: PropTypes.string,
    theme: PropTypes.string,
    dateFormat: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    minDate: PropTypes.string,
    maxDate: PropTypes.string,
  };

  return NumPad;
};
