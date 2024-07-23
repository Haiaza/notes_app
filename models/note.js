const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    text: {type: String, required: true},
    isRead: {type: Boolean, required: true}
},{
    timestamps: true
})

const Note = mongoose.model('Note', noteSchema)

module.exports=Note