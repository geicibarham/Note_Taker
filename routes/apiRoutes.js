const router = require('express').Router();
const fs = require('fs');
let uniqid = require("uniqid"); 

router.get("/notes", function (req, res) {
    fs.readFile("./db/notes.json", "utf8", function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        res.json(JSON.parse(data));
    });
})

// post notes
router.post("/notes", function (req, res) {
    let id = uniqid();
    let newNote = {
        id: id,
        title: req.body.title,
        text: req.body.text,
    };

    fs.readFile("./db/notes.json", "utf8", function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        const notesArr = JSON.parse(data);
        notesArr.push(newNote);
        const stringifyNote = JSON.stringify(notesArr);
        fs.writeFile("./db/notes.json", stringifyNote, (err) => {
            if (err) console.log(err);
            else {
                console.log("Note saved!");
                res.json('added new note')
            }
        });
    });
});
// delete note
router.delete('/notes/:id', (req, res) => {
    const idToDelete = req.params.id;

    fs.readFile("./db/notes.json", "utf8", function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        const noteArr = JSON.parse(data);
        const filteredArr = noteArr.filter(note => note.id !== idToDelete)
        fs.writeFile("./db/notes.json", JSON.stringify(filteredArr), (err) => {
            if (err) console.log(err);
            else {
                console.log("Note deleted!");
                res.json(filteredArr)
            }
        });
    });

})


module.exports = router;