const PendingBlogs = require('../Models/PendingBlogs')
const ApprovedBlog = require("../Models/ApprovedBlogs")
const verify = require("./verifyToken")
const router = require('express').Router()

router.post("/pendBlog",async(req,res)=>{
    try{
        const pendBlog = new PendingBlogs(req.body)
        const savedPendBlog = await pendBlog.save()
        res.status(200).json(savedPendBlog)
    }catch(err){
        res.status(500).json(err)
    }
})
router.delete("/pendBlog/:id",verify,async(req,res)=>{
    try{
        await PendingBlogs.findByIdAndDelete(req.params.id)
        res.status(200).json("Blog Deleted")
    }catch(err){
        res.status(500).json(err)
    }

})
router.get("/pendBlog/:name",async(req,res)=>{
    try{
      const pendBlog =   await PendingBlogs.find({title:req.params.name})
      res.status(200).json(pendBlog)
    }catch(err){
        res.status(500).json(err)
    }
})
router.get("/pendBlog",async(req,res)=>{
    try{
        const pendBlog = await PendingBlogs.find()
        res.status(200).json(pendBlog)
    }catch(err){
        res.status(500).json(err)
    }
})
router.post("/appBlog",verify,async(req,res)=>{
    try{
        const appBlog = new ApprovedBlog(req.body)
        const savedappBlog = await appBlog.save()
        res.status(200).json(savedappBlog)
    }catch(err){
        res.status(500).json(err)
    }
})
router.delete("/appBlog/:id",verify,async(req,res)=>{
    try{
        await ApprovedBlog.findByIdAndDelete(req.params.id)
        res.status(200).json("Blog Deleted")
    }catch(err){
        res.status(500).json(err)
    }

})
router.get("/appBlog/:name",async(req,res)=>{
    try{
      const appBlog =   await ApprovedBlog.find({title:req.params.name})
      res.status(200).json(appBlog)
    }catch(err){
        res.status(500).json(err)
    }
})
router.get("/appBlog",async(req,res)=>{
    try{
        const appBlog = await ApprovedBlog.find()
        res.status(200).json(appBlog)
    }catch(err){
        res.status(500).json(err)
    }
})
router.get("/Stats",verify,async (req, res) => {
  try {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    const stats = await ApprovedBlog.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          count: { $sum: 1 }, 
        },
      },
    ]);

    res.status(200).json(stats);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router