const express = require("express")
const router = express.Router()
const Movie = require("../models/movie")
const User = require("../models/user")
const hbs = require("handlebars")
const { findOne } = require("../models/movie")
const session = require("express-session")

// user login route
router.get("/login", (req, res, next) => {
    res.render("login", {})
})

router.post("/login", async (req, res, next) => { 
    const {userId} = req.session
    // console.log(req.session.name)
    username = req.body.username
    password = req.body.password 
    const user = await User.findOne({username: username})
        console.log(user)
    if(!user && user.password !== password) {
        return res.render("login", {message: true})
    }
    req.session.regenerate(function(err) {
        console.log(user._id)
        // will have a new session here
        req.session.userId = user._id
        req.session.nameId = user.name
    })
    const movie = await Movie.find({login: user._id})
    // .then((movie, err) => {
        console.log(movie)
        return res.render("index", {movie})
    // })
    //     } else {
    //         res.render("login", {message: true})
    //     }
})

// user route that posts
router.get("/user/:id", (req, res) => {
    let user = User.findById(req.session.userId, function(err, w) {
        console.log(w.name)
    })
    console.log(req.session.userId)
    Movie.find({login: req.session.userId}) 
       
    .then((movie, user) => {
        res.render("index", {movie, user})
    })
})

// registration page
router.get("/register", (req, res) =>{
        // messages gets passed in as an object
    console.log(req.session.userId)
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
        }
    })
})
// home route for /movies
router.get("/", (req, res) => {
    let user = User.findById(req.session.userId)
    // console.log(req.session.userId)

    Movie.find({})
    .then((movie) => {
        res.render("index", {movie, user})
    })
})

// sorts rank from highest to lowest
router.get("/rank", (req, res) => {
    Movie.find({})
    .populate("login")
    .then(movie => {
        movie.sort((b, a) => a.rank - b.rank)
        res.render("index", {movie})
    })
})

router.get("/a_z", (req, res) => {
    Movie.find({})
    .populate("login")
    .then(movie => {
        movie.sort((a, b) => b.name - a.name)

        res.render("index", {movie})
    })
})


router.get("/search", (req, res) => {
    res.render("new")
})

// get route for searched movie, by ID
router.get("/search/:id", (req, res) => {
    const id = req.params.id
    Movie.findById(id)
    .populate("login")
    .then(movie => {
        res.render("index", {movie})
    })
})


// create a new movie
router.post("/test", (req, res) => {
        let user = req.session.userId
        console.log(user)
       let movieName = req.body.name
        let genre = req.body.genre
        let date = req.body.date
        let rank = req.body.rank
        let comment = req.body.comment
        let img = req.body.img
        console.log(req.body)
            Movie.create({ 
                ...req.body,
                // name: movieName,
                // genre: genre,
                // date: date,
                // rank: rank,
                // comment: comment,
                // img: img,
                login: user
            })
            .then(()=>{
                movie = Movie.find({login: user}, function(err, docs) {})
                // console.log()
                res.redirect(`/movies/user/${user}`)
            })
        // } else {
            // res.render("new", {message: true})
        // }
        .catch(err => {
            console.log(err);
            res.send("no luck on create")
        })
        
    })


// show route
router.get("/:id", (req, res) => {
    id = req.params.id
    // console.log(req.body)
    Movie.findById(id)
    .populate("login")
    .then(movie => {
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

// Delete by id
router.delete("/:id", (req, res) =>{
    let id = req.params.id
    Movie.findOneAndDelete({_id: id})
    .then(() => {
        res.redirect("/movies")
    })
})





module.exports = router
