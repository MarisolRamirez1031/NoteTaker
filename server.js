const express = require('express');
const fs = require('fs');
//const path = require('path');
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

// POST for new notes
 let postNoteData;
 const postedNote = (body) => {
     fs.readFile('./db/db.json', 'utf-8', function (err, data) {
         postNoteData = data;
         console.log(data);
         notesPost.push(body);
         fs.writeFile('./db/db.json', JSON.stringify(notesPost), () => {console.log('posted')})
     })
};

app.post('/api/notes', (res, req) => {
    let postBody = req.body;
    postBody.id = notesPost.length;
    let newBody = new tags(postBody.id, postBody.title, postBody.text);
    console.log(newBody);
    postedNote(newBody);
    res.json(postNoteData);
});

// server listening
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}! 🌎`);
  });