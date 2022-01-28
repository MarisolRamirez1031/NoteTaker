const express = require('express');
const app = express();


// GET
app.get('/api/notes', (req, res) => {
    res.send('Hiya, Welcome!');
});

app.listen(3001, () => {
    console.log(`API server now on port 3001! 🌎`);
  });