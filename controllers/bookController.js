const express = require('express')
const router = express.Router()
const Book = require('../models/books')

// ROUTES FROM PROPOSAL
// GET /books --> Index page, gives a list of all the books
router.get('/', (req, res) => {
    Book.find({}, (error, allBooks) => {
        res.render('index.ejs', {books: allBooks})
    })
})
// GET /books/new --> Form to add a New book
router.get('/new', (req, res) => {
    res.render('new.ejs')
})

// GET /books/:id --> Show page, shows information about each book

// POST /books --> Creates new book
router.post('/', (req, res) => {
    if (req.body.read === 'on'){
        req.body.read = true
    } else {
        req.body.read = false
    }
    Book.create(req.body, (error, createdBook) => {
        if (error) {
            console.log(error)
        } else {
            console.log(createdBook)
            res.redirect('/books')
        }
    })
})

// DELETE /books/:id --> Deletes a book

// GET /books/:id/edit --> Form to edit/add information to a book

// PUT /books/:id --> Changes the information on the server from the edit page

module.exports = router