import React, {useState} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function ModalBody({ selectedTags, isEditingDescription, description, onDescriptionChange,
    onDescriptionSave, onDescriptionClick, availableTags, dueDate, onDueDateChange,
    checklist, onChecklistChange }) {
    // States
    const [localChecklist, setLocalChecklist] = useState(checklist || []);
    const [localDueDate, setLocalDueDate] = useState(dueDate || null);

    // Helper Function
    const getTagColor = (tagName) => {
        const tag = availableTags.find(t => t.name.toLowerCase() === tagName.toLowerCase());
        return tag ? tag.color : '#808080';
    };

    // Handle Due Date Change
    const handleDueDateChange = (newDate) => {
        setLocalDueDate(newDate);
        onDueDateChange(newDate);
    };

    // Handling Checklist Changes
    const handleCheckboxChange = (id) => {
        const updatedChecklist = localChecklist.map((item) =>
            item.id === id ? { ...item, completed: !item.completed } : item
          );
          setLocalChecklist(updatedChecklist);
          onChecklistChange(updatedChecklist);
    };

    const handleTextChange = (id, text) => {
        const updatedChecklist = localChecklist.map((item) =>
            item.id === id ? { ...item, text } : item
          );
          setLocalChecklist(updatedChecklist);
          onChecklistChange(updatedChecklist);
    };

    const addNewItem = () => {
        const newItem = { id: Date.now(), text: '', completed: false };
        const updatedChecklist = [...localChecklist, newItem];
        setLocalChecklist(updatedChecklist);
        onChecklistChange(updatedChecklist);
    };

    const removeItem = (id) => {
        const updatedChecklist = localChecklist.filter((item) => item.id !== id);
        setLocalChecklist(updatedChecklist);
        onChecklistChange(updatedChecklist);
    };

    return (
        <div className="modal-left">
            <div className="modal-body">
                {/* Tags */}
                <div className="modal-tags">
                    <strong>Tags:</strong>
                    {selectedTags.length > 0 ? (
                        selectedTags.map((tag) => (
                            <div key={tag} className={`tag ${tag.toLowerCase()}`} style={{ background: getTagColor(tag) }}>
                                {tag}
                            </div>
                        ))
                    ) : (
                        <div>No tags selected</div>
                    )}
                </div>

                {/* Due Date */}
                <div className="modal-due-date">
                    <strong>Due Date:</strong><br/>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Select Due Date"
                            value={localDueDate}
                            onChange={handleDueDateChange}
                            renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                        />
                    </LocalizationProvider>
                </div>

                {/* Description */}
                <div className="modal-description">
                    <strong>Description:</strong>
                    {isEditingDescription ? (
                        <TextField
                            multiline
                            fullWidth
                            size='small'
                            value={description}
                            onChange={onDescriptionChange}
                            onBlur={onDescriptionSave}
                            onKeyDown={(e) => e.key === 'Enter' && onDescriptionSave()}
                            autoFocus
                        />
                    ) : (
                        <div className="modal-description-text" onClick={onDescriptionClick}>
                            {description || 'No description available'}
                        </div>
                    )}
                </div>
                
                {/* Checklist */}
                <div className="checklist">
                    {/* Title */}
                    <div className="checklist-header">
                        <strong>Checklist</strong>
                    </div>

                    {/* Items */}
                    {localChecklist.map(item => (
                        <div key={item.id} className="checklist-item">
                            <input
                                type="checkbox"
                                checked={item.completed}
                                onChange={() => handleCheckboxChange(item.id)}
                            />
                            <TextField 
                                multiline
                                fullWidth
                                size="small"
                                value={item.text} 
                                variant="standard" 
                                onChange={(e) => handleTextChange(item.id, e.target.value)} 
                                className={item.completed ? 'completed' : ''}
                            />
                            <DeleteIcon
                                color="action"
                                onClick={() => removeItem(item.id)}
                                type='button'
                                className='delete-btn'
                            />
                        </div>
                    ))}
                    <Button 
                        size='small' 
                        color="action" 
                        variant="text" 
                        startIcon={<AddIcon />} 
                        onClick={addNewItem}
                        className='add-item-btn'
                        >Add new item
                    </Button>
                </div>

            </div>
        </div>
    );
}

export default ModalBody;
