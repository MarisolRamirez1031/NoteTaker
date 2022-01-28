const express = require('express');
const app = express();
const notes = require('./db/db.json');


const PORT = process.env.PORT || 3001;


// GET
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}! 🌎`);
  });