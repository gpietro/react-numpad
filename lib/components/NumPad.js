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
  let transitionProps = {
    in: show,
    direction: 'up',
    mountOnEnter: true,
    unmountOnExit: true,
  };
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
    top: `${coords.top + window.pageYOffset - 300}px`,
    left: `${coords.left + window.pageXOffset}px`,
  }),
  startTopRight: coords => ({
    top: `${coords.top + window.pageYOffset - 300}px`,
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
      this.update = this.update.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.value !== nextProps.value) {
        this.setState({
          value: nextProps.value.toString().replace(/\D+/g, ''),
        });
      }
    }

    toggleKeyPad(coords = {}) {
      const { position } = this.props;
      const inputCoords =
        !this.state.show && updateCoords[position] ? updateCoords[position](coords) : undefined;
      this.setState(prevState => ({ show: !prevState.show, inputCoords }));
    }

    update(value) {
      const { dateFormat, onChange } = this.props;
      onChange(displayRule(value, dateFormat));
    }

    confirm(value) {
      let updateValue = {};
      if (this.state.show && validation(value)) {
        updateValue = { value };
        this.update(value);
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
        dates,
        minDate,
        maxDate,
        position,
        sync,
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
                  <Wrapper show>
                    {React.createElement(
                      element,
                      {
                        cancel: this.toggleKeyPad,
                        confirm: this.confirm,
                        update: this.update,
                        eventTypes: ['click', 'touchend'],
                        displayRule,
                        validation,
                        keyValid,
                        label,
                        locale,
                        markers,
                        dates,
                        weekOffset,
                        dateFormat,
                        minDate,
                        maxDate,
                        value,
                        sync,
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
    weekOffset: 0,
    locale: 'en',
    value: '',
    minDate: undefined,
    maxDate: undefined,
    sync: false,
    markers: [],
    dates: [],
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
    weekOffset: PropTypes.number,
    markers: PropTypes.arrayOf(PropTypes.string),
    dates: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    minDate: PropTypes.string,
    maxDate: PropTypes.string,
    sync: PropTypes.bool,
  };

  return NumPad;
};
