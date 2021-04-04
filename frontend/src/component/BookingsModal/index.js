// frontend/src/components/BookingsModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import BookingsForm from './BookingsForm'
function BookingsModal({spotId}) {
  const [showModal, setShowModal] = useState(false);
  function handleChange () {
    setShowModal(false)
  }


  return (
    <>
      <button className="bookings_button signup-button" onClick={() => setShowModal(true)}>Book Now</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <BookingsForm spotId={spotId} onChange={handleChange}/>

        </Modal>
      )}
    </>
  );
}

export default BookingsModal;
