const express = require('express');
const router = express.Router()

// Import the required controllers and middleware functions

const { createNote, updateNote, getAllNotes, getNote, deleteNote } = require('../controllers/Notes');

const { auth } = require("../middleware/auth")


// Route for user signup
router.post("/createNote",auth, createNote);
router.get("/getAllNotes",auth, getAllNotes);
router.get("/getNote",auth, getNote);
router.put("/updateNote",auth, updateNote);
router.delete("/deleteNote",auth, deleteNote);

module.exports = router;