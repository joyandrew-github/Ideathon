// src/components/NoteCard.jsx
import React, { useState } from 'react';
import '../App.css';

const NoteCard = ({ note, onDelete, onEdit }) => {
  return (
    <div className="note-card">
      <h3>{note.title}</h3>
      <p>{note.description}</p>
      <span className="timestamp">{note.timestamp}</span>
      <div className="note-card-buttons">
        <button className="delete-btn" onClick={() => onDelete(note.id)}>Delete</button>
        <button className="edit-btn" onClick={() => onEdit(note)}>Edit</button>
      </div>
    </div>
  );
};

export default NoteCard;
