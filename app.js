const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const {Blog} = require("./models/blog")

dotenv.config();

const app = express()

app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to the database.")
        app.listen(3000)
    })
    .catch(err => {
        console.log(err)
    })

app.get("/blogs", async(req, res) => {
    try{
        const blogs = await Blog.find();
        res.send(blogs)
    }catch{
        res.status(500);
        res.send("error");
    }
})


