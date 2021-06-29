const mongoose = require("../db/connection")

const MovieSchema = new mongoose.Schema({
    name: {type: String},
    genre: [],
    comment: String,
    date: String,
    rank: {type: Number},
    img: String,
    imdbID: String,
    login: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

// instantiate the Movie model
const Movie = mongoose.model("Movie", MovieSchema)

//  export Movie model
module.exports = Movie