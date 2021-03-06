// frontend/src/components/SpotCreationModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SpotCreationForm from './SpotCreationForm'
function SpotCreationModal() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  function handleChange () {
    setShowCreateModal(false)
  }
  return (
    <>
      <button className="spotCreation_button signup-button" onClick={() => setShowCreateModal(true)}>Host For Us</button>
      {showCreateModal && (
        <Modal onClose={() => setShowCreateModal(false)}>
          <div className="modal-box">
          <SpotCreationForm onChange={handleChange}/>
          </div>
        </Modal>
      )}
    </>
  );
}

export default SpotCreationModal;
