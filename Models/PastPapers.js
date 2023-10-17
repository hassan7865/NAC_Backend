const mongoose  = require("mongoose")

const PastPapersSchema = new mongoose.Schema({
    title:{type:String,required:true},
    imgUrl:{type:String,required:true},
    link:{type:String,required:true}    
},{timestamps:true})

module.exports = mongoose.model("PastPapers", PastPapersSchema)