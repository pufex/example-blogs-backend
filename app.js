const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const morgan = require("morgan")
const {Blog} = require("./models/blog")

dotenv.config();

const app = express()

app.use(morgan("dev"))
app.use(express.urlencoded({extended: true}));
app.use(express.json())

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

app.get("/blogs/:id", async (req, res) => {
    try{
        const blog_id = req.params.id
        const blog = await Blog.findById(blog_id)
        if(!blog){
            res.status(404)
            res.send(null)
        }else{
            res.send(blog);
        }
    }catch{
        res.status(500)
        res.send("error")
    }
})

app.post("/blogs", async (req, res) => {
    try{
        const blog = await new Blog(req.body);
        await blog.save();
        res.send(blog);
    }catch(err){
        console.log(err)
        console.log(body)
        res.status(500)
        res.send("error")
    }
})