// frontend/src/components/ReviewModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ReviewForm from './ReviewModalForm'
function ReviewModal({spotId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="Review_button" onClick={() => setShowModal(true)}>Write review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ReviewForm spotId={spotId}/>
        </Modal>
      )}
    </>
  );
}

export default ReviewModal;
