// imports
const express = require("express")
const app = express()
const methodOverride = require("method-override")
// const cors = require("cors")

// initialize and configure express
// app.use(cors())
app.set("view engine", "hbs")
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"))
app.use(methodOverride("_delete"))

// require models
const Movie = require("./models/movie")
// routes
const moviesController = require("./controllers/moviesController")
app.use("/movies", moviesController)
// app.get("/", (req, res) => {
//     Movie.find({})
//     .then(movie => {
//         res.render("index", {movie})
//     })
// })


// listening port
app.set("port", process.env.PORT || 3500)
app.listen(app.get("port"), () => {
    console.log(`Running on that ${app.get("port")} thang`);
})





