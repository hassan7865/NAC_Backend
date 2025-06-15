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
app.use(cors({
    origin: '*',
    methods:["GET","POST","PUT","DELETE"]
}))
const connect = ()=>{
    mongoose.connect(process.env.MONGOURL).
    then(()=>console.log("Db Connection Successfull"))
    .catch((err)=>{
        throw err
    })
}

connect()
app.use("/api/faq",FaqRoute)
app.use("/api/test",TestRoute)
app.use("/api/pastpapers",PastPapersRoute)
app.use("/api/news",NewsRoute)
app.use("/api/auth",Login)
app.use("/api/blog",PendingBlogs)
app.use("/api/Count",TotalCount)

app.post('/api/track-visit', (req, res) => {
  const ip =
    req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'Unknown';
  const { referrer, location, userAgent } = req.body;

  let searchKeyword = null;

  if (referrer) {
    const url = new URL(referrer);
    const hostname = url.hostname;
    const params = url.searchParams;

    if (hostname.includes('google.')) {
      searchKeyword = params.get('q');
    } else if (hostname.includes('bing.com')) {
      searchKeyword = params.get('q');
    } else if (hostname.includes('yahoo.com')) {
      searchKeyword = params.get('p');
    } else if (hostname.includes('duckduckgo.com')) {
      searchKeyword = params.get('q');
    } else if (hostname.includes('yandex.')) {
      searchKeyword = params.get('text');
    } else if (hostname.includes('baidu.com')) {
      searchKeyword = params.get('wd');
    }
  }

  const visitData = {
    ip,
    referrer,
    searchKeyword: searchKeyword ? decodeURIComponent(searchKeyword) : null,
    page: location,
    userAgent,
    timestamp: new Date()
  };

  console.log('Visit:', visitData);
  // Save to database here

  res.sendStatus(200);
});
app.listen(process.env.PORT,()=>{
   
    console.log(`Server Started at Port ${process.env.PORT}`)
})
