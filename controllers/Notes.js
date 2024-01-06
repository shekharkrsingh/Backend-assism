const Notes = require('../models/Notes');

exports.createNote = async (req, res) => {
    try {
        const userId = req.user.id;

        const {title, description} = req.body;

        if (!title || !description) {
            return res
                .status(400)
                .json({success: false, message: "All Fields are Mandatory"})
        }

        const newNote = await Notes.create({title, description, user: userId})
        res
            .status(200)
            .json({success: true, data: newNote, message: "Note Created Successfully"})

    } catch (error) {
        res
            .status(500)
            .json({success: false, message: "Failed to create note", error: error.message})
    }
}

exports.getAllNotes = async (req, res) => {
    try {
        const userId = req.user.id;

        const allNotes = await Notes.find({user: userId});

        return res
            .status(200)
            .json({success: true, data: allNotes})
    } catch (error) {
        res
            .status(500)
            .json(
                {success: false, message: "Failed to retrieve notes ", error: error.message}
            )
    }
}

exports.getNote = async (req, res) => {
    try {
        const userId = req.user.id;
        const {noteId} = req.body;
        if (!noteId) {
            return res
                .status(401)
                .json({success: false, message: "Notes Id required"})
        }

        const note = await Notes.findById(noteId);
        if (!note) {
            return res
                .status(401)
                .json({success: false, message: "Not any note available of this ID"})
        }

        if (note.user._id != userId) {
            return res
                .status(401)
                .json(
                    {success: false, message: "You are not an authorized person to seee this note"}
                )
        }

        return res
            .status(200)
            .json({success: true, data: note})
    } catch (error) {
        res
            .status(500)
            .json(
                {success: false, message: "Failed to retrieve note  ", error: error.message}
            )
    }
}

exports.updateNote = async (req, res) => {
    try {
        const userId = req.user.id;
        const {noteId, title, description} = req.body;

        if (!title || !description) {
            return res
                .status(501)
                .json({success: false, message: "cannot update blank title or description "})
        }

        if (!noteId) {
            return res
                .status(401)
                .json({success: false, message: "Notes Id required"})
        }

        const note = await Notes.findById(noteId);
        if (!note) {
            return res
                .status(401)
                .json({success: false, message: "Not any note available of this ID"})
        }
        // console.log(userId); console.log(note.user._id)
        if (note.user._id != userId) {
            return res
                .status(401)
                .json(
                    {success: false, message: "You are not an authorized person to seee this note"}
                )
        }

        const updatedNote = await Notes.findByIdAndUpdate(noteId, {
            title: title,
            description: description
        }, { new: true });
        return res
            .status(200)
            .json({success: true, message: "Note update successfully", data: updatedNote})
    } catch (error) {
        res
            .status(500)
            .json(
                {success: false, message: "Failed to update note  ", error: error.message}
            )
    }
}

exports.deleteNote = async (req, res) => {
    try {
        const userId = req.user.id;
        const {noteId} = req.body;
        if (!noteId) {
            return res
                .status(401)
                .json({success: false, message: "Notes Id required"})
        }

        const note = await Notes.findById(noteId);
        if (!note) {
            return res
                .status(401)
                .json({success: false, message: "Not any note available of this ID"})
        }

        if (note.user._id != userId) {
            return res
                .status
                .json(
                    {success: false, message: "You are not an authorized person to seee this note"}
                )
        }

        await Notes.findByIdAndDelete(noteId);

        return res
            .status(200)
            .json({success: true, message: "Note deleted successfully"})
    } catch (error) {
        res
            .status(500)
            .json({success: false, message: "Failed to delete Note", error: error.message})
    }
}