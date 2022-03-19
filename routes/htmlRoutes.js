const router = require('express').Router();
const path = require('path')

// get notes will return notes html file
router.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// get * should return html file
router.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router