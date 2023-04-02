import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { Overlay, ModalForm } from './Modal.styled';

export const Modal =({children, closeModal})=> {

  useEffect (()=> {
    window.addEventListener('keydown', handleKeyDownEscape);

    return () => {
      window.removeEventListener('keydown', handleKeyDownEscape)
    }
   })

   const handleKeyDownEscape = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  
    return (
      <Overlay onClick={handleBackdropClick}>
        <ModalForm >
          {children}
        </ModalForm>
      </Overlay>
    );
  }


Modal.propTypes = {
  children: propTypes.node,
  closeModal: propTypes.func.isRequired,
};