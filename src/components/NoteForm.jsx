// src/components/NoteForm.jsx
import React, { useState, useEffect } from 'react';
import '../App.css';

const NoteForm = ({ onAddNote, onUpdateNote, noteToEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setDescription(noteToEdit.description);
    }
  }, [noteToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      const noteData = {
        id: noteToEdit ? noteToEdit.id : Date.now(),
        title,
        description,
        timestamp: noteToEdit ? noteToEdit.timestamp : new Date().toLocaleString(),
      };
      
      if (noteToEdit) {
        onUpdateNote(noteData);
      } else {
        onAddNote(noteData);
      }

      setTitle('');
      setDescription('');
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <h2>{noteToEdit ? 'Edit Note' : 'Create a Note'}</h2>
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
      <button type="submit">{noteToEdit ? 'Update Note' : 'Add Note'}</button>
    </form>
  );
};

export default NoteForm;
