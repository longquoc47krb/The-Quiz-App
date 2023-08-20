import React from 'react';

// Import your CSS module for styling

const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: any;
  children: any;
}) => {
  if (!isOpen) return null;

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <button className="closeButton" onClick={onClose} type="button">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
