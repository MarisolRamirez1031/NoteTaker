const express = require('express');
const notes = require('./db/db.json');
const routes = require('./routes/routes');
const PORT = process.env.PORT || 3001;
const app = express();



function findByQuery(title, notes) {
    const notesTitle = notes.filer(note => note.title === title)[0];
    return notesTitle;
}

// GET all notes
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// GET note by title
app.get('api/notes:title', (req, res) => {
    const notesTitle = findByQuery(req.params.title, notes);
    res.json(notesTitle);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}! 🌎`);
  });