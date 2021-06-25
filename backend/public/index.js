// grab the names the user inputs, and display all of the possible movie images when searching for their movie

const Movie = require("../models/movie")

// filter from a-z
function aToZ(a, b) {
    if(a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1
    }
    if(a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1
    }
    return 0
}
// filter by genre
function genre(a, b) {
    if(a.genre.toLowerCase() < b.genre.toLowerCase()) {
        return -1
    }
    if(a.genre.toLowerCase() > b.genre.toLowerCase()) {
        return 1
    }
    return 0
}
// filter by ranking
function highestRating(a, b) {
    return b.rank - a.rank
}

Movie.sort(highestRating)
Movie.sort(aToZ)
Movie.sort(genre)