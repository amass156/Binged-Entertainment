// imports
const express = require("express")
const app = express()
const methodOverride = require("method-override")
const session = require("express-session")
const flash = require("connect-flash")
// const cors = require("cors")

// initialize and configure express
// app.use(cors())
app.set("view engine", "hbs")
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static("/public"))
app.use(methodOverride("_method"))
app.use(methodOverride("_delete"))
app.use(session({
    secret: "session secret",
    resave: false,
    saveUninitialized: false,
}))
app.use(flash())


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





