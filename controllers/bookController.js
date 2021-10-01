const express = require('express')
const router = express.Router()
const Book = require('../models/books')

// Custom middleware - needed to require authentication on routes
const authRequired = (req, res, next) => {
    if (req.session.currentUser) {
        next()
    } else {
        res.redirect('/users/signin')
    }
}

// ROUTES FROM PROPOSAL
// GET /books --> Index page, gives a list of all the books
router.get('/', (req, res) => {
    let order = {}
    let filter = {}
    if (req.query.sort === 'asc' || req.query.sort === 'desc') {
        order = {title: req.query.sort}
    } else if (req.query.sort === 'author') {
        order = {authorLast: 'asc'}
    } else if (req.query.sort === 'genre') {
        order = [['genre', 'ascending'], ['author', 'ascending']]    
    }
    if (req.query.genre) {
        filter.genre = req.query.genre
        order = {title: 'asc'}
    }
    Book.find(filter).sort(order).exec((error, allBooks) => {
        return res.render('index.ejs', {books: allBooks})
     })
})

// GET /books/new --> Form to add a New book
router.get('/new', authRequired, (req, res) => {
    res.render('new.ejs')
})

// GET /books/list --> Show text list version of books
router.get('/list', (req, res) => {
    let order = {}
    let filter = {}
    if (req.query.sort === 'asc' || req.query.sort === 'desc') {
        order = {title: req.query.sort}
    } else if (req.query.sort === 'author') {
        order = {authorLast: 'asc'}
    } else if (req.query.sort === 'genre') {
        order = [['genre', 'ascending'], ['author', 'ascending']]    
    }
    if (req.query.genre) {
        filter.genre = req.query.genre
        order = {title: 'asc'}
    }
    Book.find(filter).sort(order).exec((error, allBooks) => {
        return res.render('list.ejs', {books: allBooks})
     })
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
router.delete('/:id', authRequired, (req, res) => {
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
router.get('/:id/edit', authRequired, (req, res) => {
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