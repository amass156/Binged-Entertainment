const Movie = require("../models/movie")
const User = require("../models/user")
const seedData = require("./seeds.json")

Movie.deleteMany({})
    .then(() => User.deleteMany({}))
    .then(() => {
        return User.create({name: "My Name", username: "fakeusername123", password: "fakepassword"})
            .then((user) => 
            seedData.map((movie) => ({...movie, login: user._id}))
            )
            .then((movies) => Movie.insertMany(movies))
    })
    .then(console.log)
    .catch(console.error)
    .finally(()=> {
        process.exit()
    })