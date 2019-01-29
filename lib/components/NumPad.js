import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Portal } from 'react-portal';
import { ThemeProvider } from 'styled-components';
import Slide from '@material-ui/core/Slide';
import IconEdit from 'react-icons/lib/md/edit';
// import IconClock from 'react-icons/lib/md/access-time';
// import MdCalendar from 'react-icons/lib/md/date-range';
import { InputField, Wrapper } from '../elements';

import GlobalStyle from '../styles/global-css';
import styles from '../styles';

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
// const inputButtonContent2 = <IconClock />;
// const inputButtonContent3 = <MdCalendar />;

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

  static getDerivedStateFromProps(props, state) {
    if (props.value && props.value !== state.value) {
      return { value: (props.value || '').toString() };
    }
  }

  toggleKeyPad(coords = {}) {
    const { position } = this.props;
    const { show } = this.state;
    const inputCoords =
      !show && updateCoords[position] ? updateCoords[position](coords) : undefined;
    this.setState(prevState => ({ show: !prevState.show, inputCoords }));
  }

  update(value) {
    const { onChange } = this.props;
    onChange(value);
  }

  confirm(value) {
    const { show } = this.state;
    let updateValue = {};
    if (show) {
      updateValue = { value };
      this.update(value);
    }
    this.setState(prevState => Object.assign({}, { show: !prevState.show }, updateValue));
  }

  render() {
    const { show, value, inputCoords } = this.state;

    const {
      children,
      placeholder,
      label,
      theme,
      locale,
      markers,
      position,
      sync,
      customInput,
    } = this.props;
    const customTheme = typeof theme === 'object' ? theme : styles(theme);
    customTheme.position = position;
    customTheme.coords = inputCoords;

    const display = position !== 'flex-start' && position !== 'flex-end' ? show : true;
    const { transition, transitionProps } = getTransition(show, position);

    return (
      <Fragment>
        <GlobalStyle />
        <ThemeProvider theme={customTheme}>
          <InputField
            placeholder={placeholder}
            showKeyPad={this.toggleKeyPad}
            inputValue={value}
            label={label}
            disabled={show}
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
                  {React.cloneElement(children, {
                    cancel: this.toggleKeyPad,
                    confirm: this.confirm,
                    update: this.update,
                    eventTypes: ['click', 'touchend'],
                    value,
                    label,
                    locale,
                    markers,
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
  locale: 'en',
  value: '',
  sync: false,
  markers: [],
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
  markers: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  sync: PropTypes.bool,
};

export default NumPad;
