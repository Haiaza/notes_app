const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    text: {type: String, required: true},
    isRead: {type: Boolean, required: true}
},{
    timestamps: true
})

const Note = mongoose.model('Note', noteSchema)

module.exports=Note

//article example

const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    slug: { type: String, required: true, unique: true }
})