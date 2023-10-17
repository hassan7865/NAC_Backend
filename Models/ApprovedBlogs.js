const mongoose = require("mongoose")

const ApprovedBlogSchema = new mongoose.Schema({
    title:{type:String,required:true},
    subtitle:{type:String},
    imgUrl:{type:String,required:true},
    authorname:{type:String,required:true},
    authoremail:{type:String,required:true},
    content:{type:String,required:true}
},{timestamps:true})
module.exports = mongoose.model("ApprovedBlogs",ApprovedBlogSchema)