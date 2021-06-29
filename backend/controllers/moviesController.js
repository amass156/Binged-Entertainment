const express = require("express")
const router = express.Router()
const Movie = require("../models/movie")
const User = require("../models/user")
const hbs = require("handlebars")
const { findOne } = require("../models/movie")
const session = require("express-session")
// const MongoDBStore = require("connect-mongodb-session")(session)

// user login route
router.get("/login", (req, res, next) => {
    // const messages = req.flash()
    // messages gets passed in as an object
    // console.log(res)
    res.render("login", {})
})

router.post("/login", (req, res, next) => { 
    const {userId} = req.session
    console.log(req.session.name)
    username = req.body.username
    password = req.body.password 
    // console.log(username)
    // console.log(password)
    User.findOne({username: username})
    .then((user, error)=> {
        req.session.userId = user._id
        req.session.nameId = user.name
        // console.log(req.session.name)
    // console.log(req.session.userId)
        if(user && user.password == password) {
            Movie.find({login: user._id})
            .then((movie, err) => {
                // specify which users collection of movie will render
                res.render("index", {movie})
                // console.log(movie)
            })
        } else {
            res.render("login", {message: true})
            // console.log(user)
        }
    })
})

// user route that posts
router.get("/user/:id", (req, res) => {
    let user = User.findById(req.session.userId, function(err, w) {
        console.log(w)
    })
    console.log(req.session.userId)
    Movie.find({login: req.session.userId}) 
        // console.log(user)
        // console.log(movies)
        // res.render("index", {movies, user})
    // })
    .then((movie) => {
        console.log(movie)
        res.render("index", {movie, user})
    })
    // res.json({movies: movies})
})

// registration page
router.get("/register", (req, res) =>{
        // messages gets passed in as an object
    console.log(req.session.userId)
    // console.log(userId)
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
    // const {userId} = req.session
    let user = User.findById(req.session.userId)
    console.log(req.session.userId)

    // console.log(req.session)
    Movie.find({})
    // .populate("login")
    // do a .then(()=> {
        // req.session.userid
    // })
    .then((movie) => {
        // console.log(movie)

        res.render("index", {movie, user})
        // console.log(movie[0].genre[0])
    })
})

// sorts rank from highest to lowest
router.get("/rank", (req, res) => {
    Movie.find({})
    .populate("login")
    .then(movie => {
        movie.sort((b, a) => a.rank - b.rank)
        movie[0].img = "https://m.media-amazon.com/images/M/MV5BMTg1MTY2MjYzNV5BMl5BanBnXkFtZTgwMTc4NTMwNDI@._V1_SX300.jpg"
        // console.log(User.findById({}))

        res.render("index", {movie})
        // console.log(movie[0].genre[0])
    })
})

router.get("/a_z", (req, res) => {
    Movie.find({})
    .populate("login")
    .then(movie => {
        movie.sort((a, b) => b.name - a.name)
        movie[0].img = "https://m.media-amazon.com/images/M/MV5BMTg1MTY2MjYzNV5BMl5BanBnXkFtZTgwMTc4NTMwNDI@._V1_SX300.jpg"
        // console.log(User.findById({}))

        res.render("index", {movie})
        // console.log(movie[0].genre[0])
    })
})

// router.get

// Search route that handles movie names
// render them all the movies
// onclick go to create form, then input all subjective information
// search route for movie name
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

// continue creating your new movie
// router.post("/search/new", (req, res) => {
//     // break up each req.body(put genre in an array)
//     console.log("test")
//     routeID = req.params.id
//     Movie.create(
//         {
//             name:req.body.name,
//             genre: [req.body.genre]
//             // login: 
//     })
//     // .populate("login")
//     .then((movie)=> {
//         res.render("new", {movie})
//     })
//     .catch(err => {
//         console.log(err);
//         res.render("movieSearch", {message: true})
//     })
// })

// create route for /movies
// router.get("/search/new", (req, res) => {
//     routeID = req.params.id
//     Movie.findById(routeID)
//     .then(movie => {
//         res.render("edit", movie)
//     })
// })

// create a new movie
router.post("/user/:id", (req, res) => {
        // break up each req.body(put genre in an array)
        // console.log(req.session.currentuser.id)
        let user = req.session.userId
        // console.log(User.findById(user))
        // console.log(req.session)
       let movieName = req.body.name
        let genre = req.body.genre
        let date = req.body.date
        let rank = req.body.rank
        let comment = req.body.comment
            Movie.create({
                name: movieName,
                genre: genre,
                date: date,
                rank: rank,
                comment: comment,
                login: user
            })
            .then((us)=>{
                // console.log(movie)
                movie = Movie.find({login: user}, function(err, docs) {})
                console.log(us)
                // console.log(movie)
                res.redirect(`/movies/user/${user}`)
            })
        // } else {
            // res.render("new", {message: true})
        // }
        // .populate("login")
        // .then(movie => {
        //     // console.log(result)
        //     console.log(movie)
        // })
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
        // movie.img = "https://m.media-amazon.com/images/M/MV5BMTg1MTY2MjYzNV5BMl5BanBnXkFtZTgwMTc4NTMwNDI@._V1_SX300.jpg"
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

// Delete by id
router.delete("/:id", (req, res) =>{
    let id = req.params.id
    Movie.findOneAndDelete({_id: id})
    .then(() => {
        res.redirect("/movies")
    })
})





module.exports = router
