const mongoose  = require("mongoose")

const NewsSchema = new mongoose.Schema({
    title:{type:String,required:true},
    imgUrl:{type:String,required:true},
    link:{type:String},
    file:{type:String},
    desc:{type:String,required:true}
},{timestamps:true})

module.exports = mongoose.model("News",NewsSchema)