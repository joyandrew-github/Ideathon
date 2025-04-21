// src/App.jsx
import React, { useState } from 'react';
import NoteForm from './components/NoteForm';
import NoteCard from './components/NoteCard';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [noteToEdit, setNoteToEdit] = useState(null);

  const handleAddNote = (note) => {
    setNotes([note, ...notes]);
  };

  const handleUpdateNote = (updatedNote) => {
    setNotes(notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)));
    setNoteToEdit(null); // Reset edit mode after update
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleEditNote = (note) => {
    setNoteToEdit(note); // Set the note to be edited
  };

  return (
    <div className="container">
      <h1>QuickNotes 📝</h1>
      <NoteForm onAddNote={handleAddNote} onUpdateNote={handleUpdateNote} noteToEdit={noteToEdit} />
      <div className="notes-grid">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} onDelete={handleDeleteNote} onEdit={handleEditNote} />
        ))}
      </div>
    </div>
  );
}

export default App;
