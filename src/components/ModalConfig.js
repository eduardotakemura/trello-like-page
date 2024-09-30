import React from 'react';

function ModalConfig({ onOpenTagModal, onDelete }) {
    return (
        <div className="modal-right">
            <button className="modal-settings-btn" onClick={onOpenTagModal}>
                Manage Tags
            </button>
            <button className="modal-settings-btn" onClick={onDelete}>Delete Card</button>
        </div>
    );
}

export default ModalConfig;
