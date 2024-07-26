require('dotenv').config() // ?

const express = require('express')
const app = express() //* everything is inside this HTTP SERVER
const mongoose = require('mongoose')
const Note = require('./models/note')
const logger = require('morgan')
//* tell mongoose to connect with the URI on our mongoDB atlas server
const MONGODB_URI = process.env.MONGODB_URI
const PORT = 3000
//
app.use(express.json())
app.use(logger('tiny'))
mongoose.connect(MONGODB_URI)
mongoose.connection.once('open', () => {
    console.log('MongoDB connection established!')
})

mongoose.connection.on('error', () => {
    console.error('MongoDB refuses this BS')
})

// controller & router logic

// Create
app.post('/notes', async (req, res) => {
    try {
        const createdNote = await Note.create(req.body)
        res.json(createdNote)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
})

//Read
//Index and Show

app.get('/notes', async (req, res) =>{
    try {
        const foundNotes = await Note.find({})
        res.json(foundNotes)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})

app.get('/notes/:id', async (req, res) => {
    try {
        const foundNote = await Note.findOne({_id: req.params.id})
        res.json(foundNote)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})

app.listen(PORT , () => {
    console.log('Were listening to port 3000')
})