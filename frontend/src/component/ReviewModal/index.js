// frontend/src/components/ReviewModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ReviewForm from './ReviewModalForm'
function ReviewModal({spotId, onChange, reload}) {
  const [showModal, setShowModal] = useState(false);
  function handleChange () {
    setShowModal(false)
  }

  return (
    <>
      <button className="Review_button signup-button" onClick={() => setShowModal(true)}>Write review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="modal-box">
          <ReviewForm spotId={spotId} onChange={handleChange} onChange2={onChange} reload={reload}/>
          </div>
        </Modal>
      )}
    </>
  );
}

export default ReviewModal;
