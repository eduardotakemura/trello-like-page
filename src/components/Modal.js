import React, { useState } from 'react';
import TagsModal from './TagModal';
import ModalBody from './ModalBody';
import ModalConfig from './ModalConfig';
import './../styles/Modal.css';

function Modal({ card, onClose, onUpdateCard, onDeleteCard, availableTags }) {
    // States
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [isTagsModalOpen, setIsTagsModalOpen] = useState(false);
    const [selectedTags, setSelectedTags] = useState(card?.tags || []);
    const [title, setTitle] = useState(card?.title || '');
    const [description, setDescription] = useState(card?.description || '');
    const [checklist, setChecklist] = useState(card?.checklist || []);
    const [dueDate, setDueDate] = useState(card?.dueDate || '');
    
    // Prevent Displaying modal if no card info was passed
    if (!card) return null;

    // Handling Title Changes
    const handleTitleClick = () => setIsEditingTitle(true);
    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleTitleSave = () => {
        setIsEditingTitle(false);
        onUpdateCard({ ...card, title, tags: selectedTags });
        console.log(dueDate);
    };

    // Handling Description Changes
    const handleDescriptionClick = () => setIsEditingDescription(true);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleDescriptionSave = () => {
        setIsEditingDescription(false);
        onUpdateCard({ ...card, description, tags: selectedTags });
    };

    // Tags Modal and Handling Changes
    const handleTagModalOpen = () => setIsTagsModalOpen(true);
    const handleTagModalClose = () => {
        onUpdateCard({ ...card, tags: selectedTags });
        setIsTagsModalOpen(false);
    };
    const handleTagSelect = (tag) => {
        setSelectedTags((prevTags) =>
            prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
        );
    };

    // Handle Due Date Change
    const handleDueDateChange = (newDate) => {
        setDueDate(newDate);
        onUpdateCard({ ...card, dueDate: newDate, tags: selectedTags, checklist });
    };

    // Handle Checklist Change
    const handleChecklistChange = (newChecklist) => {
        setChecklist(newChecklist);
        onUpdateCard({ ...card, checklist: newChecklist, tags: selectedTags, dueDate });
    };

    return (
        <>
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                        {isEditingTitle ? (
                            <input
                                className="modal-title-input"
                                value={title}
                                onChange={handleTitleChange}
                                onBlur={handleTitleSave}
                                onKeyDown={(e) => e.key === 'Enter' && handleTitleSave()}
                                autoFocus
                            />
                        ) : (
                            <h2 onClick={handleTitleClick}>{title || 'Untitled Card'}</h2>
                        )}

                        <span className="modal-close" onClick={onClose}>
                            &times;
                        </span>
                    </div>

                    <div className="modal-body-container">
                        <ModalBody
                            selectedTags={selectedTags}
                            isEditingDescription={isEditingDescription}
                            description={description}
                            onDescriptionChange={handleDescriptionChange}
                            onDescriptionSave={handleDescriptionSave}
                            onDescriptionClick={handleDescriptionClick}
                            availableTags={availableTags}
                            dueDate={dueDate}
                            onDueDateChange={handleDueDateChange}
                            checklist={checklist}
                            onChecklistChange={handleChecklistChange}
                        />

                        <ModalConfig onOpenTagModal={handleTagModalOpen} onDelete={() => onDeleteCard(card.id)} />
                    </div>
                </div>
            </div>

            {isTagsModalOpen && (
                <TagsModal
                    onClose={handleTagModalClose}
                    selectedTags={selectedTags}
                    onTagSelect={handleTagSelect}
                    availableTags={availableTags}
                />
            )}
        </>
    );
}

export default Modal;
