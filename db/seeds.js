const seedData = require("./seeds.json")
const Movie = require("../models/movie")

Movie.deleteMany({})
    .then(() => {
        return Movie.insertMany(seedData)
    })
    .then(console.log)
    .catch(console.error)
    .finally(()=> {
        process.exit()
    })