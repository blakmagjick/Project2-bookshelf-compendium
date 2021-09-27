const mongoose = require('mongoose')
const {Schema, model} = mongoose

const bookSchema = new Schema({
    title: {type: String, required: true},
    authorFirst: {type: String, required: true},
    authorLast: {type: String, required: true},
    translator: String,
    series: String,
    cover: String,
    genre: String,
    tags: [String],
    rating: {type: Number, min: 1, max: 5},
    notes: String,
    read: {type: Boolean, default: false}
})

const Book = model('Book', bookSchema)
module.exports = Book