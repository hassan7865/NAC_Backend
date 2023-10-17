const router = require("express").Router()
const News = require("../Models/News")
const verify = require("./verifyToken")
router.post("/createnews",verify,async(req,res)=>{
    try{
        const news = new News(req.body)
        const savednews = await news.save()
        res.status(200).json(savednews)
    }catch(err){
        res.status(500).json(err)
    }
})
router.delete("/deletenews/:id",verify,async(req,res)=>{
    try{
        await News.findByIdAndDelete(req.params.id)
        res.status(200).json("News Deleted")
    }catch(err){
        res.status(500).json(err)
    }
})
router.get("/getnews",async(req,res)=>{
    try{
        const news = await News.find()
        res.status(200).json(news)
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports = router