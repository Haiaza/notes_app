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
app.use(express.json()) //* parse the body and get back json
app.use(express.urlencoded({ extended: true })) //* parsing the body and accepting urlencoded data
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
    req.body.isRead === 'on'  || req.body.isRead === true ?
    req.body.isRead = true :
    req.body.isRead = false
    try {
        const createdNote = await Note.create(req.body)
        res.status(301).redirect(`/notes/${createdNote._id}`)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
})

app.get('/notes/new', (req, res) =>{
    res.render('new.ejs')
})


// app.post('/notes', async (req, res) => {
//     try {
//         const createdNote = await Note.create(req.body)
//         res.json(createdNote)
//     } catch (error) {
//         res.status(400).json({msg: error.message})
//     }
// })


//Read
//Index and Show

// app.get('/notes', async (req, res) =>{
//     try {
//         const foundNotes = await Note.find({})
//         res.json(foundNotes)
//     } catch (error) {
//         res.status(400).json({ msg: error.message })
//     }
// })
//* Index
app.get('/notes', async (req, res) =>{
    try {
        const foundNotes = await Note.find()
        res.render('index.ejs', {
            notes : foundNotes
        })
    } catch (error) {
        res.status(400).json({ msg: error.message})
    }
})

// app.get('/notes/:id', async (req, res) => {
//     try {
//         const foundNote = await Note.findOne({_id: req.params.id})
//         res.json(foundNote)
//     } catch (error) {
//         res.status(400).json({ msg: error.message })
//     }
// })
//* Show
app.get('/notes/:id', async (req, res) => {
    try {
        const foundNote = await Note.findOne({_id: req.params.id})
        res.render('show.ejs', {
            note: foundNote
        })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})

app.listen(PORT , () => {
    console.log('Were listening to port 3000')
})
//Update
app.put('/notes/:id', async (req, res) => {
    try {
        // 1 .What were targetting 2. what were replacing 3.What it is replaced by
        const updatedNote = await Note.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        res.json(updatedNote)
    } catch (error) {
        res.status(400).json({ msg: error.message})
    }
})


//Delete
app.delete('/notes/:id', async (req, res) =>{
    try {
        await Note.findOneAndDelete({ _id: req.params.id })
        .then((note) =>{
            res.sendStatus(204)
        })

    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})