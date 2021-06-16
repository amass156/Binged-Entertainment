const mongoose = require("../db/connection")

const UserSchema = new mongoose.Schema({
    name: String,
    username: {type: String, required: true},
    password: {type: String, required: true}
})

// instantiate the Movie model
const User = mongoose.model("User", UserSchema)

//  export Movie model
module.exports = User