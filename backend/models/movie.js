const mongoose = require("../db/connection")

const MovieSchema = new mongoose.Schema({
    name: {type: String, required: true},
    genre: String,
    comment: String,
    date: String,
    rank: {type: Number, required:true}
})

// instantiate the Movie model
const Movie = mongoose.model("Movie", MovieSchema)

//  export Movie model
module.exports = Movie