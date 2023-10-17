const mongoose  = require("mongoose")

const TestSchema = new mongoose.Schema({
    title:{type:String,required:true},
    link:{type:String,required:true},
    type:{type:String,required:true}
},{timestamps:true})

module.exports = mongoose.model("Test",TestSchema)