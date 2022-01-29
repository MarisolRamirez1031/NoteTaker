const express = require('express');
const fs = require('fs');
const path = require('path');
const notesPost =  require('./db/db.json')

const PORT = process.env.PORT || 3001;
const app = express();

// find by title 
function findByQuery(title, notesPost) {
    const noteTitle = notesPost.filter(note => note.title === title)[0];
    return noteTitle;
}

// GET req all notes
app.get('/api/notes', (req, res) => {
    res.json(notesPost);
  });

// GET req title
app.get('/api/notes/:title', (req, res) => {
    const noteTitle = findByQuery(req.params.title, notesPost);
    res.json(noteTitle);
});





// server listening
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}! 🌎`);
  });