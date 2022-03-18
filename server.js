const express = require('express');
const fs = require('fs');
const notes = require('./db/notes.json');

const app = express();
app.use(express.urlencoded({ extended: true }));

var note = fs.readFileSync('./db/notes.json');

app.get('/api/notes', (req, res) => {
    res.json(notes);
  });


  app.post('/api/notes', (req, res) => {
    console.log(req.body);
    res.json(req.body);
  });

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });

