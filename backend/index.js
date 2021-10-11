// imports
const express = require("express")
const app = express()
const methodOverride = require("method-override")
const session = require("express-session")
const MongoDBStore = require("connect-mongodb-session")(session)
const flash = require("connect-flash")
const hbs = require("hbs")
const https = require('https')
const fetch = require("node-fetch")
// app.use(express.cookieParser('your secret here'));rs
require("./db/connection")


// Mongodb session
store = new MongoDBStore({
    uri: "mongodb://localhost/binged-entertainment2",
    collection: "mySessions"
})
// Catch errors
store.on('error', function(error) {
    console.log(error);
  });
  


// const cors = require("cors")

// initialize and configure express
// app.use(cors())
hbs.registerPartials(__dirname + '/views/partials');
app.set("view engine", "hbs")
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use(methodOverride("_method"))
app.use(methodOverride("_delete"))





// require models
const Movie = require("./models/movie")
// routes

// const {
    const NODE_ENV = "development"
    const SESS_NAME = "sid"
    const SESS_SECRET = "session secret"
// } = process.env

const IN_PROD = NODE_ENV === "production"


app.use(session({
    name: SESS_NAME,
    secret: SESS_SECRET,
    cookie: {
        secure: false,
        sameSite: true
    },
    store: store,
    resave: false,
    saveUninitialized: false
}))


app.use((req, res, next)=> {
    res.locals.userId = req.session.userId
    next()
})
app.use(flash())

const moviesController = require("./controllers/moviesController")
const { get } = require("mongoose")
app.use("/movies", moviesController)

app.get("/", (req, res)=> {
    res.redirect("/movies/login")
})



// app.get("/", (req, res) => {
//     Movie.find({})
//     .then(movie => {
//         res.render("index", {movie})
//     })
// })


// Total number of movies in a collection
// hbs.registerHelper("totalNumberMovies", function(movies) {
//     console.log(Object.keys(movies));
//     return Object.keys(movies).length 
// })



hbs.registerHelper("movieIndex", function(currIndex) {
    indexNum = currIndex + 1
        return indexNum
})



// listening port
app.set("port", process.env.PORT || 3500)
app.listen(app.get("port"), () => {
    console.log(`Running on that ${app.get("port")} thang`);
})






