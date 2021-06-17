const express = require("express")
const router = express.Router()
const Movie = require("../models/movie")


// home route for /movies
router.get("/", (req, res) => {
    Movie.find({})
    .then(movie => {
        res.render("index", {movie})
    })
})

// create route for /movies
router.get("/new", (req, res) => {
    res.render("new")
})

// create a new movie
router.post("/", (req, res) => {
    // if(req.body.rank <= 10){
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
    Movie.findById(id)
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




module.exports = router
