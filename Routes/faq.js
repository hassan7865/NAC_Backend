const router =  require("express").Router()
const FAQS =  require("../Models/FAQS")
const verify = require("./verifyToken")
router.post("/createfaq",verify,async(req,res)=>{
    try{
        const faq = new FAQS(req.body)
        const savefaq = await faq.save()
        res.status(200).json(savefaq)
    }catch(err){
        res.status(500).json(err)
    }
})
router.delete("/deletefaq/:id",verify,async(req,res)=>{
    try{
        await FAQS.findByIdAndDelete(req.params.id)
        res.status(200).json("FAQ Deleted")
    }catch(err){
        res.status(500).json(err)
    }
})
router.get("/getfaq",async(req,res)=>{
    try{
        const faq = await FAQS.find()
        res.status(200).json(faq)
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports = router