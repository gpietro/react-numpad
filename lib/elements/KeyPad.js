import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import onClickOutside from 'react-onclickoutside';
import Color from 'color';
import IconCheck from 'react-icons/lib/md/check';
import IconCheckCircle from 'react-icons/lib/md/check-circle';
import IconCancel from 'react-icons/lib/md/close';

import Button from './KeypadButton';
import Display from './Display';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 264px;
  height: 250px;
  background: ${props => props.theme.body.backgroundColor};
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 45px, rgba(0, 0, 0, 0.22) 0px 10px 18px;
`;

const Label = styled.div`
  overflow: hidden;
  font-size: 1.4em;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2px 5px;
  align-items: center;
  color: ${props => props.theme.header.secondaryColor};
  background: ${props => props.theme.header.backgroundColor};
  user-select: none;
`;

const CancelButton = styled.button`
  color: ${props => props.theme.header.secondaryColor};
  &:hover {
    color: ${props => props.theme.header.highlightColor};
  }
  cursor: pointer;
  border: none;
  background: transparent;
  font-size: 1.6em;
  padding: 0px 0px 2px 0px;
  :active,
  :focus {
    outline: none;
  }
`;

const ConfirmButton = CancelButton.extend`
  :disabled {
    cursor: now-allowed;
    color: ${props =>
      Color(props.theme.header.secondaryColor)
        .darken(0.4)
        .string()};
  }
`;

const Keys = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  button {
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;
  }
  button:nth-child(3n) {
    border-right: none;
  }
  button:nth-child(-n + 3) {
    border-top: 1px solid #ddd;
  }
`;

class KeyPad extends Component {
  constructor(props) {
    super(props);
    this.state = { input: props.value };
    this.handleClick = this.handleClick.bind(this);
    this.keyDown = this.keyDown.bind(this);
    this.cancelLastInsert = this.cancelLastInsert.bind(this);
    this.numericKeys = [...Array(10).keys()];
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyDown);
  }

  componentWillUpdate(nextProps, nextState) {
    const { input } = this.state;
    const { sync, validation, update } = this.props;
    if (sync && nextState.input !== input && validation(nextState.input)) {
      update(nextState.input);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDown);
  }

  handleClickOutside(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    const { sync, validation, confirm, cancel } = this.props;
    const { input } = this.state;
    if (validation(input)) {
      confirm(input);
    } else {
      cancel();
    }
  }

  cancelLastInsert() {
    this.setState(prevState => ({ input: prevState.input.slice(0, -1) }));
  }

  keyDown(event) {
    event.preventDefault();
    const { key } = event;
    const { input } = this.state;
    const { confirm, cancel, validation } = this.props;
    if (key === 'Enter' && validation(input)) {
      confirm(input);
    } else if (key === 'Backspace') {
      this.cancelLastInsert();
    } else if (key === 'Escape') {
      cancel();
    } else if (this.numericKeys.includes(parseInt(key, 10)) || key === '.' || key === '-') {
      this.handleClick(key);
    }
  }

  handleClick(key) {
    if (this.props.keyValid(this.state.input, key, this.props.dateFormat)) {
      if (key === '-') {
        this.setState(prevState => ({
          input:
            prevState.input.charAt(0) === '-' ? prevState.input.substr(1) : `-${prevState.input}`,
        }));
      } else {
        this.setState(prevState => ({ input: prevState.input + key }));
      }
    }
  }

  render() {
    const {
      displayRule,
      validation,
      label,
      confirm,
      cancel,
      theme,
      keyValid,
      dateFormat,
    } = this.props;

    return (
      <Content>
        <Header>
          <CancelButton onClick={cancel}>
            <IconCancel />
          </CancelButton>
          <Label>{label}</Label>
          <ConfirmButton
            onClick={() => confirm(this.state.input)}
            disabled={!validation(this.state.input)}
          >
            {validation(this.state.input) ? <IconCheckCircle /> : <IconCheck />}
          </ConfirmButton>
        </Header>
        <Display
          value={this.state.input}
          displayRule={displayRule}
          dateFormat={dateFormat}
          cancel={this.cancelLastInsert}
        />
        <Keys>
          {[7, 8, 9, 4, 5, 6, 1, 2, 3, '-', 0, '.'].map(key => (
            <Button
              key={`button-${key}`}
              theme={theme}
              click={clickedKey => this.handleClick(clickedKey)}
              value={key}
              disabled={!keyValid(this.state.input, key, dateFormat)}
            />
          ))}
        </Keys>
      </Content>
    );
  }
}

KeyPad.displayName = 'KeyPad';

KeyPad.propTypes = {
  label: PropTypes.string,
  theme: PropTypes.string,
  confirm: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  displayRule: PropTypes.func.isRequired,
  validation: PropTypes.func.isRequired,
  keyValid: PropTypes.func.isRequired,
  dateFormat: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  sync: PropTypes.bool.isRequired,
};

KeyPad.defaultProps = {
  label: undefined,
  theme: undefined,
  dateFormat: 'MM/DD/YYYY',
  value: '',
};

export default onClickOutside(KeyPad);
