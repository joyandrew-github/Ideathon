// src/App.jsx
import React, { useState } from 'react';
import NoteForm from './components/NoteForm';
import NoteCard from './components/NoteCard';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);

  const handleAddNote = (note) => {
    setNotes([note, ...notes]);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="container">
      <h1>QuickNotes 📝</h1>
      <NoteForm onAddNote={handleAddNote} />
      <div className="notes-grid">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} onDelete={handleDeleteNote} />
        ))}
      </div>
    </div>
  );
}

export default App;
