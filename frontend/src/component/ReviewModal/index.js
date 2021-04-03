// frontend/src/components/ReviewModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ReviewForm from './ReviewModalForm'
function ReviewModal({spotId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="Review_button signup-button" onClick={() => setShowModal(true)}>Write review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="modal-box">
          <ReviewForm spotId={spotId}/>
          </div>
        </Modal>
      )}
    </>
  );
}

export default ReviewModal;
