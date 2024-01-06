const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            maxLength:100,
        },
        description: {
            type:String,
            required:true,
            maxLength:300,
        },
        user: {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
        },
        createdAt:{
            type:Date,
            required:true,
            default:Date.now(),
        },
        updatedAt:{
            type:Date,
            required:true,
            default:Date.now(),
        }
    }
);

module.exports = mongoose.model("Note", notesSchema);