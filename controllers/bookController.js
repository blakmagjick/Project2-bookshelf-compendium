const { application } = require('express')
const express = require('express')
const router = express.Router()
const Book = require('../models/books')

// ROUTES FROM PROPOSAL
// GET /books --> Index page, gives a list of all the books
router.get('/', (req, res) => {
    // console.log(req.query)
    if (req.query.sort === 'asc' || req.query.sort === 'desc') {
        Book.find({}).sort({title: req.query.sort}).exec((error, allBooks) => {
            // console.log(allBooks, 'query')
           return res.render('index.ejs', {books: allBooks})
        })
    // } else if (req.query.sort === 'author') {
    //     Book.find({}).sort({author: asc}).exec((error, allBooks) => {
    //        console.log(allBooks, 'author')
    //        return res.render('index.ejs', {books: allBooks})
    //     })
    // } else if (req.query.sort === 'genre') {
    //     Book.find({}).sort({genre: desc}).exec((error, allBooks) => {
    //         console.log(allBooks, 'genre')
    //         return res.render('index.ejs', {books: allBooks})
    //      })
    } else {
        Book.find({}, (error, allBooks) => {
            // console.log(allBooks, 'without')
            return res.render('index.ejs', {books: allBooks})
        })
    }
})
// GET /books/new --> Form to add a New book
router.get('/new', (req, res) => {
    res.render('new.ejs')
})

// GET /books/:id --> Show page, shows information about each book
router.get('/:id', (req, res) => {
    Book.findById(req.params.id, (error, foundBook) => {
        res.render('show.ejs', {book: foundBook})
    })
})

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
router.delete('/:id', (req, res) => {
    Book.findByIdAndDelete(req.params.id, (error, deletedBook) => {
        if (error) {
            console.log(error)
            res.send(error)
        } else {
            res.redirect('/books')
        }
    })
})

// GET /books/:id/edit --> Form to edit/add information to a book
router.get('/:id/edit', (req, res) => {
    Book.findById(req.params.id, (error, editBook) => {
        if (error) {
            console.log(error)
        } else {
            res.render('edit.ejs', {book: editBook})
        }
    })
})

// PUT /books/:id --> Changes the information on the server from the edit page
router.put('/:id', (req, res) => {
    req.body.read = (req.body.read === 'on')
    Book.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedBook) => {
        let bookID = req.params.id
        if (error) {
            console.log(error)
        } else {
            res.redirect(`/books/${bookID}`)
        }
    })
})

module.exports = router