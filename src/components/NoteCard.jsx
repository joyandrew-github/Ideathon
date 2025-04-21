// src/components/NoteCard.jsx
import React from 'react';
import '../App.css';

const NoteCard = ({ note, onDelete }) => {
  return (
    <div className="note-card">
      <h3>{note.title}</h3>
      <p>{note.description}</p>
      <span className="timestamp">{note.timestamp}</span>
      <button onClick={() => onDelete(note.id)}>Delete</button>
    </div>
  );
};

export default NoteCard;
