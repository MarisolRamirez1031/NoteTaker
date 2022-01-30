const express = require('express');
const fs = require('fs');
const path = require('path');
const notesPost = require('./db/db.json')
const PORT = process.env.PORT || 3001;
const app = express();

class tags {
    constructor(id, title, text){
        this.id = id;
        this.title = title;
        this.text = text;
    }
};

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));

// find by title 
function findByQuery(title, notesPost) {
    const noteTitle = notesPost.filter(note => note.title === title)[0];
    return noteTitle;
}

// GET req all notes
app.get('/api/notes', (req, res) => {
    res.json(notesPost);
  });

// GET req title only
app.get('/api/notes/:title', (req, res) => {
    const noteTitle = findByQuery(req.query.title, notesPost);
    res.json(noteTitle);
});

// join GET req to notes.html
app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// POST for new notes
 let allData;
 const createdNote = (body) => {
     fs.readFile('./db/db.json', 'utf-8', function (err, data) {
         allData = data;
         console.log(data);
         notesPost.push(body);
         fs.writeFile('./db/db.json', JSON.stringify(notesPost), () => {console.log('createdFile')})
     })
};

app.post('/api/notes', (req, res) => {
    let fileWritten = req.body;
    fileWritten.id = notesPost.length;
    let newBody = new tags(fileWritten.id, fileWritten.title, fileWritten.text);
    console.log(newBody);
    createdNote(newBody);
    res.json(allData);
});

// server listening
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}! 🌎`);
  });