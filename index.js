const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const Login = require("./Routes/auth")
const NewsRoute = require("./Routes/news")
const PastPapersRoute = require("./Routes/pastpapers")
const TestRoute = require("./Routes/test")
const FaqRoute = require("./Routes/faq")
const TotalCount = require("./Routes/totalCount")
const PendingBlogs  = require("./Routes/Blogs")
const cors = require("cors")
dotenv.config()
const app = express()
app.use(express.json())
const allowedOrigins = ["http://localhost:5173", "https://another-allowed-domain.com"];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

const connect = ()=>{
    mongoose.connect(process.env.MONGOURL).
    then(()=>console.log("Db Connection Successfull"))
    .catch((err)=>{
        throw err
    })
}
app.use("/api/faq",FaqRoute)
app.use("/api/test",TestRoute)
app.use("/api/pastpapers",PastPapersRoute)
app.use("/api/news",NewsRoute)
app.use("/api/auth",Login)
app.use("/api/blog",PendingBlogs)
app.use("/api/Count",TotalCount)
app.listen(process.env.PORT,()=>{
    connect()
    console.log(`Server Started at Port ${process.env.PORT}`)
})
