// frontend/src/components/SignupModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupModalForm'
function SignupModal({spotId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="signup-button" onClick={() => setShowModal(true)}>Sign Up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="modal-box">
          <SignupForm spotId={spotId}/>
          </div>
        </Modal>
      )}
    </>
  );
}

export default SignupModal;
