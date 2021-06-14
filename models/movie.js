const mongoose = require("../db/connection")

const MovieSchema = new mongoose.Schema({
    name: String,
    genre: String,
    comment: String,
    date: Date,
    rank: {type: Number, max: 10}
})

// instantiate the Movie model
const Movie = mongoose.model("Movie", MovieSchema)

//  export Movie model
module.exports = Movie