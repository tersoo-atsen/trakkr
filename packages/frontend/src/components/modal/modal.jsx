import React from 'react';
import PropTypes from 'prop-types';

import './modal.scss';

const Modal = ({ closeModal, handleDelete }) => (
  <div className="modal">
    <div className="modal-background" />
    <div className="modal-card">
      <div className="modal-card-body">
        <p>Are you sure you want to delete this item?</p>
        <p>If you delete this item you cannot recover it.</p>
        <div className="buttons field is-grouped">
          <p className="control">
            <button className="button cancel-button" onClick={closeModal}>Cancel</button>
          </p>
          <p className="control">
            <button className="button" onClick={handleDelete}>Delete</button>
          </p>
        </div>
      </div>
    </div>
  </div>
);

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Modal;
