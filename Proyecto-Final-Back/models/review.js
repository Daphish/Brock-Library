const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: String,
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    comment: String
})

module.exports = mongoose.model("Review", reviewSchema);