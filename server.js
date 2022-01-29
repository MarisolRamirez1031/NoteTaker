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

// middleware 
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());


// function to make a new note
 function newNoteMade(body, notesArray) {
     const note = body;
     notesArray.push(note);
     fs.writeFileSync(__dirname, './db/db.json'),JSON.stringify({notesPost: notesArray}, null, 2)
 };




// GET route 
app.get('/api/notes', (req, res) => {
    res.json(notesPost);
  });


// find by title 
function findByQuery(title, notesPost) {
    const noteTitle = notesPost.filter(note => note.title === title)[0];
    return noteTitle;
}

// GET req title only
app.get('/api/notes/:title', (req, res) => {
    const noteTitle = findByQuery(req.query.title, notesPost);
    res.json(noteTitle);
});

// GET req to notes.html
app.get('/notes', function(req,res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
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