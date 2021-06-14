// imports
const express = require("express")
const app = express()

// initialize and configure express
app.set("view engine", "hbs")
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride("_method"))
// app.use(methodOverride("_delete"))

// require models
const Movie = require("./models/movie")
// routes
app.get("/", (req, res) => {
    Movie.find({})
    .then(movies => {
        res.json(movies)
    })
})


// listening port
app.set("port", process.env.PORT || 3500)
app.listen(app.get("port"), () => {
    console.log(`Running on that ${app.get("port")} thang`);
})





