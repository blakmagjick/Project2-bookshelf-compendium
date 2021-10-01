const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const User = require('../models/user')

// Register Route
router.get('/register', (req, res) => {
    res.render('users/register.ejs', {message: req.flash('message')})
})

// Post Route for Register Page
router.post('/register', (req, res) => {
    const salt = bcrypt.genSaltSync(5)
    req.body.password = bcrypt.hashSync(req.body.password, salt)
    console.log(req.body)

    User.findOne({username: req.body.username}, (error, userExists) => {
        if (userExists) {
            req.flash('message', 'Username already taken')
            res.redirect('back')
        } else {
            User.create(req.body, (error, createUser) => {
                if (error) {
                    console.log(error)
                } else {
                    req.session.currentUser = createUser
                    res.redirect('/books')
                } 
            })
        }
    })
})

// Signin Route
router.get('/signin', (req, res) => {
    res.render('users/signin.ejs', {message1: req.flash('message1')})
})

// Confirm Signin Credentials
router.post('/signin', (req, res) => {
    User.findOne({username: req.body.username}, (error, foundUser) => {
        if (foundUser) {
            const validLogin = bcrypt.compareSync(req.body.password, foundUser.password)
            if (validLogin) {
                req.session.currentUser = foundUser
                res.redirect('/books')
            } else {
                req.flash('message1', 'Username or password are incorrect')
                res.redirect('back')
            }
        } else {
            req.flash('message1', 'Username or password are incorrect')
            res.redirect('back')
        }
    })
})

// Destroy Session Route (Logout)
router.get('/signout', (req, res) => {
    req.session.destroy()
    res.redirect('/books')
})


module.exports = router