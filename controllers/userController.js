const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const Book = require('../models/books')

// Register Route
router.get('/register', (req, res) => {
    res.render('users/register.ejs')
})

// Post Route for Register Page

// Signin Route
router.get('/signin', (req, res) => {
    res.render('users/signin.ejs')
})

// Confirm Signin Credentials

// Destory Session Route (Logout)



module.exports = router