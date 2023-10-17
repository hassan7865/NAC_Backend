const Test = require("../Models/Test")
const router = require("express").Router()
const verify = require("./verifyToken")

router.post("/createtest",verify,async(req,res)=>{
    try{
        const item = new Test(req.body)
        const save = await item.save()
        res.status(200).json(save)
    }catch(err){
        res.status(500).json(err)
    }
})
router.delete("/deletetest/:id",verify,async(req,res)=>{
    try{
        await Test.findByIdAndDelete(req.params.id)
        res.status(200).json("Test has been deleted")
    }catch(err){
        res.status(500).json(err)
    }
})
router.get("/geTtest",async(req,res)=>{
    try{
        const test = await Test.find()
        res.status(200).json(test)
    }catch(err){
        res.status(500).json(err)
    }
})



module.exports = router