import { motion } from 'framer-motion';
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
      <motion.div
        initial={{ opacity: 0, y: 300 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease: 'easeOut',
          type: 'spring',
          stiffness: 100,
        }}
        className="modalContent"
      >
        <button className="closeButton" onClick={onClose} type="button">
          &times;
        </button>
        {children}
      </motion.div>
    </div>
  );
};

export default Modal;
