const express = require("express")
const router = express.Router()
const Movie = require("../models/movie")
const User = require("../models/user")
const hbs = require("handlebars")
const { findOne } = require("../models/movie")

// user login route
router.get("/login", (req, res, next) => {
    // const messages = req.flash()
    // messages gets passed in as an object
    res.render("login", {})
})

router.post("/login", (req, res, next) => { 
    username = req.body.username
    password = req.body.password 
    User.findOne({username: username})
    .then((user, error)=> {
        if(user && user.password == password) {
            Movie.find({login: user._id})
            .then((movie, err) => {
                // specify which users collection of movie will render
                res.render("index", {movie})
                console.log(movie)
            })
        } else {
            res.render("login", {message: true})
        }
    })
})

// registration page
router.get("/register", (req, res) =>{
        // messages gets passed in as an object
    res.render("register")
})

// post for registration
router.post("/register", (req, res) =>{ 
    const user = {
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    }
    let username = req.body.username
    // create an if statement that checks to see if the user already exists. 
    // Only if the user does not exist an account should be created
    User.findOne({username: username})
        .then((u) => {
            console.log(u)
            if (u && u.username == username) {
                res.render("register", {message: true})
            } else { 
                    User.create(user)
                    .then(() => {
                        res.render("login")
                    })
        // //     req.flash("success", "User account was registered successfully")  
        }
    })
})
// home route for /movies
router.get("/", (req, res) => {
    Movie.find({})
    .populate("login")
    .then(movie => {
        res.render("index", {movie})
        console.log(movie[0].genre[0])
    })
})

// Search route that handles movie names
// render them all the movies
// onclick go to create form, then input all subjective information


// create route for /movies
router.get("/new", (req, res) => {
    res.render("new")
})

// create a new movie
router.post("/", (req, res) => {
    // if(req.body.rank <= 10){
        // break up each req.body(put genre in an array )
        Movie.create(req.body)
        .then(result => {
            res.redirect("/movies")
        })
        .catch(err => {
            console.log(err);
            res.send("no luck on create")
        })
    // }
})

// show route
router.get("/:id", (req, res) => {
    id = req.params.id
    console.log(req.body)
    Movie.findById(id)
    .populate("login")
    .then(movie => {
        movie.img = "https://m.media-amazon.com/images/M/MV5BMTg1MTY2MjYzNV5BMl5BanBnXkFtZTgwMTc4NTMwNDI@._V1_SX300.jpg"
        res.render("show", movie)
    })
})

// edit a movie by id
router.get("/:id/edit", (req, res) => {
    const routeID = req.params.id
    Movie.findById(routeID)
        .then(movie => {
            res.render("edit", movie)
        })
}) 

router.put("/:id", (req, res) => {
    // push new genre into the array, create a new array for the genre
    // break up req.body... put genre into an array
    let id = req.params.id
    console.log(req.body)
    Movie.findOneAndUpdate(
        {_id: id},
        req.body,
        {new: true})
        .then(movie => {
            res.render("show", movie)
        })
})




module.exports = router
