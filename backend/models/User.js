const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : String,
    username: String,
    email: String,
    phone:Number,
    password:String
})

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel