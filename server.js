const express = require("express")
const fs = require("fs");
const path = require("path");
let uniqid = require("uniqid"); 
const notes = require("./db/notes.json");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes

// get notes will return notes html file
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// display notes
app.get("/api/notes", function (req, res) {
  fs.readFile("./db/notes.json", "utf8", function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    res.json(notes);
  });
})

// post notes
app.post("/api/notes", function (req, res) {
  let id =uniqid();
  let newNote = {
    id: id,
    title: req.body.title,
    text: req.body.text,
  };
  notes.push(newNote);
  const stringifyNote = JSON.stringify(notes);
  res.json(notes);
  fs.writeFile("./db/notes.json", stringifyNote, (err) => {
    if (err) console.log(err);
    else {
      console.log("Note saved!");
    }
  });
});
// delete note


// get * should return html file
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});


app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});

