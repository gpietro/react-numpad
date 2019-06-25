import React, { useRef } from 'react';
import { Portal } from 'react-portal';
import useOnClickOutside from 'use-onclickoutside';

// eslint-disable-next-line react/prop-types
const Modal = ({ onClose, show, children }) => {
  const ref = useRef();
  useOnClickOutside(ref, onClose);

  // Render nothing if the "show" prop is false
  if (!show) {
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
        <BodyWrapper onClose={onClose} ref={ref}>
          {children}
        </BodyWrapper>
      </div>
    </Portal>
  );
};

// eslint-disable-next-line react/prop-types
const Body = ({ children }) => {
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
        {children}
      </div>
    </div>
  );
};

const BodyWrapper = Body;

export default Modal;
