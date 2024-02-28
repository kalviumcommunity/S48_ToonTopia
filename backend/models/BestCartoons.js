const mongoose = require('mongoose');

const CartoonSchema = new mongoose.Schema({
    name : String,
    favorite_cartoon : Object,
    // title: String,
    // genre:String,
    // description:String
})

const CartoonModel = mongoose.model("datas", CartoonSchema)
module.exports = CartoonModel
