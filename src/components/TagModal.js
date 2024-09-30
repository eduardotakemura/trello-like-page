import React from 'react';
import './../styles/TagModal.css';

function TagModal({ onClose, selectedTags, onTagSelect, availableTags }) {
  return (
    <div className="tags-modal-overlay" onClick={onClose}>
      <div className="tags-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="tags-modal-header">
          <h3>Select Tags</h3>
          <span className="tags-modal-close" onClick={onClose}>
            &times;
          </span>
        </div>

        <div className="tags-modal-body">
          {availableTags.map((tag) => (
            <div
              key={tag.name}
              className='tag'
              onClick={() => onTagSelect(tag.name)}
              style={{ background: tag.color }}
            >
              {tag.name}
              {selectedTags.includes(tag.name) && <span className="checkmark">✔</span>}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default TagModal;
