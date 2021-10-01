const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const User = require('../models/user')

// Register Route
router.get('/register', (req, res) => {
    res.render('users/register.ejs')
})

// Post Route for Register Page
router.post('/register', (req, res) => {
    const salt = bcrypt.genSaltSync(5)
    req.body.password = bcrypt.hashSync(req.body.password, salt)
    console.log(req.body)

    User.findOne({username: req.body.username}, (error, userExists) => {
        if (userExists) {
            res.send('That username is taken. Please pick a new one and try again')
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
    res.render('users/signin.ejs')
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
                res.send('Invalid username or password.')
            }
        } else {
            res.send('Invalid username or password')
        }
    })
})

// Destroy Session Route (Logout)
router.get('/signout', (req, res) => {
    req.session.destroy()
    res.redirect('/books')
})


module.exports = router