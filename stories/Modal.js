import React, { Component } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import { Portal } from 'react-portal';

class Modal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if (!this.props.show) {
      return null;
    }

    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50,
      zIndex: 12,
    };

    return (
      <Portal>
        <div style={backdropStyle}>
          <BodyWrapper onClose={this.props.onClose}>{this.props.children}</BodyWrapper>
        </div>
      </Portal>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node,
};

class Body extends Component {
  handleClickOutside() {
    this.props.onClose();
  }

  render() {
    const modalStyle = {
      backgroundColor: '#fff',
      width: 800,
      margin: '0 auto',
      overflow: 'hidden',
      padding: 20,
    };

    const bodyStyle = {
      maxHeight: 700,
      overflowY: 'auto',
    };

    return (
      <div className="modal" style={modalStyle}>
        <div className="body" style={bodyStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

const BodyWrapper = Body;

export default Modal;
