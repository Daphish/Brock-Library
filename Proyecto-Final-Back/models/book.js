const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    name: String,
    year: Number,
    image: String,
    description: String,
    genre: String,
    editorial: String,
    author: String
})

module.exports = mongoose.model("Book", bookSchema);