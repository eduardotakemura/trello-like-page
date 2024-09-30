import React, { useState } from 'react';
import Card from './Card';
import Modal from './Modal';
import './../styles/List.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const availableTags = [
  { name: 'Urgent', color: '#ff9f43' },
  { name: 'Development', color: '#1e90ff' },
  { name: 'Important', color: '#ff6347' },
  { name: 'Concluded', color: '#2ecc71' },
  { name: 'Postpone', color: '#f39c12' },
  { name: 'Delay', color: '#e74c3c' },
];

function List({ title, onDeleteList }) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [listTitle, setListTitle] = useState(title);
  const [showConfigMenu, setShowConfigMenu] = useState(false);
  const [cards, setCards] = useState([
    {
      id: 1,
      title: 'Project Under Development',
      description: 'Important project',
      tags: ['Important','Delay'],
      dueDate: null,
      checklist: [],
    },
    {
      id: 2,
      title: 'Task Concluded',
      description: 'A task that has been concluded with success on the schedule.',
      tags: ['Concluded'],
      dueDate: null,
      checklist: [],
    },
  ]);
  const [selectedCard, setSelectedCard] = useState(null);

  // Handling Title Changes
  const handleTitleClick = () => setIsEditingTitle(true);
  const handleTitleChange = (e) => setListTitle(e.target.value);
  const handleTitleSave = () => setIsEditingTitle(false);

  const toggleConfigMenu = () => setShowConfigMenu(!showConfigMenu);
  const handleDeleteList = () => onDeleteList();

  const addCard = () => {
    const newCardId = cards.length + 1;
    const newCardTitle = `New Card ${newCardId}`;
    setCards([
      ...cards,
      {
        id: newCardId,
        title: newCardTitle,
        description: '',
        tags: [],
        dueDate: null,
        checklist: [],
      },
    ]);
  };

  const handleCardClick = (card) => setSelectedCard(card);
  const closeModal = () => setSelectedCard(null);

  const handleUpdateCard = (updatedCard) => {
    setCards(cards.map(card => card.id === updatedCard.id ? updatedCard : card));
    setSelectedCard(updatedCard);
  };

  const handleDeleteCard = (cardId) => {
    setCards(cards.filter(card => card.id !== cardId));
    setSelectedCard(null);
  };

  // Handling Drag-and-Drop
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(cards);
    const [reorderedCard] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedCard);

    setCards(items);
  };

  return (
    <div>
      <div className="list_header">
        {isEditingTitle ? (
          <input
            className="list_title-input"
            value={listTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleSave}
            onKeyDown={(e) => e.key === 'Enter' && handleTitleSave()}
            autoFocus
          />
        ) : (
          <h3 className="list_title" onClick={handleTitleClick}>
            {listTitle}
          </h3>
        )}

        <div className="list_config-container">
          <button className="list_config-btn" onClick={toggleConfigMenu}>...</button>
          {showConfigMenu && (
            <div className="config_menu">
              <button onClick={handleTitleClick}>Rename</button>
              <button onClick={handleDeleteList}>Delete</button>
            </div>
          )}
        </div>
      </div>

      {/* Cards Rendering with Drag and Drop */}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="cards">
          {(provided) => (
            <div className="list_body" {...provided.droppableProps} ref={provided.innerRef}>
              {cards.map((card, index) => (
                <Draggable key={card.id} draggableId={String(card.id)} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Card
                        title={card.title}
                        description={card.description}
                        onClick={() => handleCardClick(card)}
                        availableTags={availableTags}
                        tags={card.tags}
                        dueDate={card.dueDate}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <button className="list_add-card-btn" onClick={addCard}>Add a card</button>

      {selectedCard && (
        <Modal
          card={selectedCard}
          onClose={closeModal}
          onUpdateCard={handleUpdateCard}
          onDeleteCard={handleDeleteCard}
          availableTags={availableTags}
        />
      )}
    </div>
  );
}

export default List;
