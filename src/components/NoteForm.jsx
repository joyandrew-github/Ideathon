// src/components/NoteForm.jsx
import React, { useState } from 'react';
import '../App.css';

const NoteForm = ({ onAddNote }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      const newNote = {
        id: Date.now(),
        title,
        description,
        timestamp: new Date().toLocaleString()
      };
      onAddNote(newNote);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <h2>Create a Note</h2>
      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Enter description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="4"
        required
      ></textarea>
      <button type="submit">Add Note</button>
    </form>
  );
};

export default NoteForm;
