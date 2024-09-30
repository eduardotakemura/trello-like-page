import React, { useState } from 'react';
import List from './List';
import './../styles/Board.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function Board() {
  // States
  const [lists, setLists] = useState([{ id: 1, title: 'My First List' }]);

  // Add a New List
  const addList = () => {
    const newListId = lists.length + 1;
    const newListTitle = `New List ${newListId}`;
    setLists([...lists, { id: newListId, title: newListTitle }]);
  };

  // Delete a List
  const deleteList = (id) => {
    setLists(lists.filter(list => list.id !== id));
  };

  // Handling Drag-and-Drop
  const onDragEnd = (result) => {
    const { destination, source } = result;

    // If dropped outside any droppable, return
    if (!destination) return;

    // If the list was dragged to the same position, do nothing
    if (destination.index === source.index) return;

    // Reorder the lists
    const newListOrder = Array.from(lists);
    const [movedList] = newListOrder.splice(source.index, 1); // Remove the list from its old position
    newListOrder.splice(destination.index, 0, movedList); // Add it to the new position

    setLists(newListOrder); // Update the state with reordered lists
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="all-lists" direction="horizontal" type="list">
      {(provided) => (
        <div className="list-container" ref={provided.innerRef} {...provided.droppableProps}>
          {lists.map((list, index) => (
            <Draggable key={list.id} draggableId={String(list.id)} index={index}>
              {(provided) => (
                <div
                  className="list"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <List title={list.title} onDeleteList={() => deleteList(list.id)} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
          <button className="list_add-btn" onClick={addList}>Add List</button>
        </div>
      )}
    </Droppable>
  </DragDropContext>
  );
}

export default Board;