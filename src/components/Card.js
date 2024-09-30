import React from 'react';
import './../styles/Card.css';

function Card({ title, description, onClick, availableTags, tags, dueDate }) {
  const getTagColor = (tagName) => {
    const tag = availableTags.find(t => t.name.toLowerCase() === tagName.toLowerCase());
    return tag ? tag.color : '#808080';
  };

  return (
    <div className="card" onClick={onClick}>
      <div className="card-tags">
        {tags.map((tag, index) => (
          <div key={index} className="card-tag" style={{ background: getTagColor(tag) }}></div>
        ))}
      </div>
      <div className="card-title">
        {title || 'Untitled Card'}
      </div>
      <div className="card-subtitle">
        <div className="card-description">{description || ''}</div>
        <div className="card-duedate">{(dueDate && `${dueDate.$M+1}/${dueDate.$D}/${dueDate.$y}`) || ''}</div>
      </div>
    </div>
  );
}

export default Card;
