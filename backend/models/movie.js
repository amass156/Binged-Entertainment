const mongoose = require("../db/connection")

const MovieSchema = new mongoose.Schema({
    name: {type: String, required: true},
    genre: [],
    comment: String,
    date: String,
    rank: {type: Number, required:true},
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