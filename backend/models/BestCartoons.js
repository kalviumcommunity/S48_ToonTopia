const mongoose = require('mongoose');

const CartoonSchema = new mongoose.Schema({
    name : String,
    title: String,
    release_date: Number,
    genre:String,
    description:String,
    created_by: String
    
})

const CartoonModel = mongoose.model("datas", CartoonSchema)
module.exports = CartoonModel