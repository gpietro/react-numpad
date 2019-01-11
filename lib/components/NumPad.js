import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Portal } from 'react-portal';
import { injectGlobal, ThemeProvider } from 'styled-components';
import Slide from '@material-ui/core/Slide';
import IconEdit from 'react-icons/lib/md/edit';
import IconClock from 'react-icons/lib/md/access-time';
import { InputField, Wrapper, KeyPad } from '../elements';

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

const inputButtonContent = <IconEdit />;
const inputButtonContent2 = <IconClock />;

class NumPad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      value: (props.value || '').toString(),
    };
    this.toggleKeyPad = this.toggleKeyPad.bind(this);
    this.confirm = this.confirm.bind(this);
    this.update = this.update.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        value: (nextProps.value || '').toString(),
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
    const { onChange } = this.props;
    onChange(value);
  }

  confirm(value) {
    let updateValue = {};
    if (this.state.show) {
      updateValue = { value };
      this.update(value);
    }
    this.setState(prevState => Object.assign({}, { show: !prevState.show }, updateValue));
  }

  render() {
    const { show, value, inputCoords } = this.state;

    const {
      placeholder,
      customInput,
      label,
      theme,
      dateFormat,
      locale,
      weekOffset,
      markers,
      dates,
      min,
      max,
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
            label={label}
            disabled={this.state.show}
            buttonContent={inputButtonContent}
            customInput={customInput}
          />
        </ThemeProvider>
        <Portal>
          {display &&
            React.createElement(
              transition,
              transitionProps,
              <ThemeProvider theme={customTheme}>
                <Wrapper show>
                  {React.cloneElement(this.props.children, {
                    cancel: this.toggleKeyPad,
                    confirm: this.confirm,
                    update: this.update,
                    eventTypes: ['click', 'touchend'],
                    value,
                    label,
                    locale,
                    markers,
                    dates,
                    weekOffset,
                    min,
                    max,
                    sync,
                  })}
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
  customInput: undefined,
  placeholder: undefined,
  position: 'flex-end',
  label: undefined,
  theme: undefined,
  weekOffset: 0,
  locale: 'en',
  value: '',
  min: undefined,
  max: undefined,
  sync: false,
  markers: [],
  dates: {},
};

NumPad.propTypes = {
  onChange: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.element)]),
  customInput: PropTypes.element,
  placeholder: PropTypes.string,
  position: PropTypes.string,
  label: PropTypes.string,
  locale: PropTypes.string,
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  weekOffset: PropTypes.number,
  markers: PropTypes.arrayOf(PropTypes.string),
  dates: PropTypes.objectOf(PropTypes.array),
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  min: PropTypes.string,
  max: PropTypes.string,
  sync: PropTypes.bool,
};

export default NumPad;
