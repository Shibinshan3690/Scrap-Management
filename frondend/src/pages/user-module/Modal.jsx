import React from 'react';

const Modal = ({ isOpen, onClose }) => {
  // Don't render anything if the modal isn't open
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-5 w-1/3">
          <h2 className="text-lg font-bold">Notifications</h2>
          <p>Your notifications will appear here.</p>
        


        
          <button className="mt-4 bg-blue-500 text-white rounded p-2" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
