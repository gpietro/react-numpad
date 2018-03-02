import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Portal } from 'react-portal';
import { injectGlobal, ThemeProvider } from 'styled-components';
import Slide from 'material-ui/transitions/Slide';
import { InputField, Wrapper } from '../elements';
import globalCSS from '../styles/global-css';
import styles from '../styles';

injectGlobal`${globalCSS}`; // eslint-disable-line no-unused-expressions

const getTransition = (show, position) => {
  let transition = Slide;
  let transitionProps = { in: show, direction: 'up', mountOnEnter: true, unmountOnExit: true };
  if (position === 'flex-start') {
    transitionProps.direction = 'down';
  }
  if (position !== 'flex-start' && position !== 'flex-end') {
    transition = 'span';
    transitionProps = {};
  }
  return { transition, transitionProps };
};

const updateCoords = {
  startBottomLeft: coords => ({
    top: `${coords.bottom + window.pageYOffset}px`,
    left: `${coords.left + window.pageXOffset}px`,
  }),
  startBottomRight: coords => ({
    top: `${coords.bottom + window.pageYOffset}px`,
    right: `${window.innerWidth - coords.right + window.pageXOffset}px`,
  }),
  startTopLeft: coords => ({
    top: `${coords.top + window.pageYOffset - 250}px`,
    left: `${coords.left + window.pageXOffset}px`,
  }),
  startTopRight: coords => ({
    top: `${coords.top + window.pageYOffset - 250}px`,
    right: `${window.innerWidth - coords.right + window.pageXOffset}px`,
  }),
};

export default ({ element, validation, displayRule, inputButtonContent, keyValid }) => {
  class NumPad extends Component {
    constructor(props) {
      super(props);
      this.state = {
        show: false,
        value: props.value.toString().replace(/\D+/g, ''),
      };
      this.toggleKeyPad = this.toggleKeyPad.bind(this);
      this.confirm = this.confirm.bind(this);
    }

    toggleKeyPad(coords = {}) {
      const { position } = this.props;
      const inputCoords =
        !this.state.show && updateCoords[position] ? updateCoords[position](coords) : undefined;
      this.setState(prevState => ({ show: !prevState.show, inputCoords }));
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
        weekOffset,
        markers,
        minDate,
        maxDate,
        position,
      } = this.props;
      const customTheme = typeof theme === 'object' ? theme : styles(theme);
      customTheme.position = position;
      customTheme.coords = inputCoords;

      const display = position !== 'flex-start' && position !== 'flex-end' ? show : true;
      const { transition, transitionProps } = getTransition(show, position);

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
            >
              {this.props.children}
            </InputField>
          </ThemeProvider>
          <Portal>
            {display &&
              React.createElement(
                transition,
                transitionProps,
                <ThemeProvider theme={customTheme}>
                  <Wrapper show={show}>
                    {React.createElement(
                      element,
                      {
                        cancel: this.toggleKeyPad,
                        confirm: this.confirm,
                        eventTypes: ['click', 'touchend'],
                        displayRule,
                        validation,
                        keyValid,
                        label,
                        locale,
                        markers,
                        weekOffset,
                        dateFormat,
                        minDate,
                        maxDate,
                        value,
                      },
                      null
                    )}
                  </Wrapper>
                </ThemeProvider>
              )}
          </Portal>
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
