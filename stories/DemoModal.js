import React, { Component } from 'react';
import Modal from './Modal';

class ExampleModal extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }
  render() {
    return (
      <div>
        <button onClick={this.toggleModal}>Click me</button>
        <Modal show={this.state.showModal} onClose={this.toggleModal}>
          {this.props.children}
        </Modal>
      </div>
    );
  }
}

export default ExampleModal;
