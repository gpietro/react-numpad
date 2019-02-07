import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import Modal from './Modal';

class ExampleModal extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  }

  render() {
    const { showModal } = this.state;
    const { children } = this.props;
    return (
      <div>
        <Button variant="outlined" onClick={this.toggleModal}>
          Open
        </Button>
        <Modal show={showModal} onClose={this.toggleModal}>
          {children}
        </Modal>
      </div>
    );
  }
}

ExampleModal.propTypes = {
  children: PropTypes.array.isRequired,
};
export default ExampleModal;
