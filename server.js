// BASIC APP SET UP
const express = require('express')
const app = express()

// .ENV VARIABLES
require('dotenv').config()
const PORT = process.env.PORT

// IMPORT MODEL
const Book = require('./models/books')
const bookSeed = require('./models/seed')

// MONGOOSE
const mongoose = require('mongoose')
const mongoURI = process.env.MONGODB_URI
const db = mongoose.connection
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('w00t...database is connected')
})
db.on('error', (err) => {console.log('ERROR: ', err)})
db.on('connected', () => {console.log('Mongo connected')})
db.on('disconnected', () => {console.log('Mongo disconnected')})

// MIDDLEWARE
const methodOverride = require('method-override')
app.use(methodOverride('_method')) 
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
// const session = require('express-session') 
// session is only needed if I get to login/logout/auth in my stretch goal

// CONTROLLERS
const bookController = require('./controllers/bookController')
app.use('/books', bookController)

// HOME PAGE
app.get('/', (req, res) => {
    res.render('home.ejs')
})

// SEED PAGE
app.post('/seed', (req, res) => {
    console.log(bookSeed)
    Book.insertMany(bookSeed,(err, books) => {
    if (err){
      console.log(err)
    } else {
    console.log("Added provided book data")
    res.redirect('/books')
        }
    })
})


app.listen(PORT, () => {
    console.log(`Reading your books on port: ${PORT}`)
})