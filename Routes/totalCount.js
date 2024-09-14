const Test = require("../Models/Test")
const News =require("../Models/News")
const PastPapers = require("../Models/PastPapers")
const Faq = require("../Models/FAQS")
const verify = require("./verifyToken")
const router = require("express").Router()
router.get("/", verify, async (req, res) => {
    try {
      const [counttest] = await Test.aggregate([{ $count: "total" }]);
      const [countnews] = await News.aggregate([{ $count: "total" }]);
      const [countpapers] = await PastPapers.aggregate([{ $count: "total" }]);
      const [countFaq] = await Faq.aggregate([{ $count: "total" }]);
  
      res.status(200).json({
        test: counttest ? counttest.total : 0,
        news: countnews ? countnews.total : 0,
        papers: countpapers ? countpapers.total : 0,
        faq: countFaq ? countFaq.total : 0,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
module.exports = router