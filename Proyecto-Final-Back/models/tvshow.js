const mongoose = require("mongoose");

const tvShowSchema = mongoose.Schema({
    name: String,
    year: Number,
    episodes: Number,
    image: String,
    image: String,
    description: String,
    genre: String,
    likes: [String]
})

module.exports = mongoose.model("TvShow", tvShowSchema);