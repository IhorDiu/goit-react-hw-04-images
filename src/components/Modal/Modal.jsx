import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Overlay, ModalForm } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDownEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDownEscape);
  }

  handleKeyDownEscape = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.closeModal();
    }
  };

  render() {
    return (
      <Overlay onClick={this.handleBackdropClick}>
        <ModalForm >
          {this.props.children}
        </ModalForm>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  children: propTypes.node.isRequired,
};