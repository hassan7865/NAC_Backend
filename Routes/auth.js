const router = require("express").Router()
const jwt = require("jsonwebtoken")
router.post("/signin", async (req, res) => {
    const { username, password } = req.body
    try {
        if (username === process.env.adminusername && password === process.env.adminpassword) {
            const token = jwt.sign({id:username},process.env.JWTKEY)
            res.status(200).json({
                "username": username,
                "token":token,
                "message": "login Successfully"
            })
        }
        else{
            res.status(401).json("Wrong Credentials")
        }
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
})
module.exports = router
