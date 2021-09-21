const express = require('express')
const router = express.Router()
const Book = require('../models/books')

// ROUTES FROM PROPOSAL
// GET /books --> Index page, gives a list of all the books
router.get('/', (req, res) => {
    console.log('Oh hai')
})
// GET /books/:id --> Show page, shows information about each book
// GET /books/new --> Form to add a New book
// POST /books --> Creates new book
// DELETE /books/:id --> Deletes a book
// GET /books/:id/edit --> Form to edit/add information to a book
// PUT /books/:id --> Changes the information on the server from the edit page

module.exports = router