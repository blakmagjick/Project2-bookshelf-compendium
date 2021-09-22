const mongoose = require('mongoose')
const {Schema, model} = mongoose

const bookSchema = new Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    series: String,
    cover: String,
    genre: String,
    tags: [String],
    rating: {type: Number, min: 1, max: 5},
    notes: String,
    read: {type: Boolean, default: false},
    dateRead: String
})

const Book = model('Book', bookSchema)
module.exports = Book