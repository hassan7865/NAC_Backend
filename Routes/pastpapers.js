const router = require("express").Router()
const PastPapers = require("../Models/PastPapers")
const verify = require("./verifyToken")
router.post("/createpaper",verify,async(req,res)=>{
    try{
        const paper = new PastPapers(req.body)
        const savedpaper = await paper.save()
        res.status(200).json(savedpaper)
    }catch(err){
        res.status(500).json(err)
    }
})
router.delete("/deletepaper/:id",verify,async(req,res)=>{
    try{
        await PastPapers.findByIdAndDelete(req.params.id)
        res.status(200).json("Paper Deleted")
    }catch(err){
        res.status(500).json(err)
    }
})
router.get("/getpaper",async(req,res)=>{
    try{
        const paper = await PastPapers.find()
        res.status(200).json(paper)
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports = router