const {Blog} = require("../models/blog")
const User = require("../models/user")

const getBlogs = async(req, res) => {
    try{
        const blogs = await Blog.find();
        res.send(blogs)
    }catch{
        res.status(500);
        res.send("error");
    }
}

const getBlogById = async (req, res) => {
    try{
        const blog_id = req.params.id
        const blog = await Blog.findById(blog_id)
        if(!blog){
            res.status(404).json({error: true, message: "Blog not found."})
        }else{
            res.send(blog);
        }
    }catch{
        res.status(500)
        res.send("error")
    }
}

const postNewBlog = async (req, res) => {
    try{
        const user_id = req.user._id
        const user = await User.findById(user_id)
        if(!user){
            return res.status(401).json({error: true, message: "You must be logged in to create a blog."})
        }
        const blog = new Blog({...req.body, user_id});
        await blog.save();
        res.send(blog);
    }catch(err){
        console.log(err)
        console.log(body)
        res.status(500)
        res.send("error")
    }
}

const deleteBlogById = async (req, res) => {
    try{
        const blog_id = req.params.id
        const blog = await Blog.findById(blog_id);
        if(!blog){
            res.sendStatus(204)
        }

        const user_id = req.user.id
        const user =  await User.findById(user_id)
        if(!user){
            return res.status(401).json({error: true, message: "You must be logged in to delete a blog."})
        }

        if(user_id != blog.user_id){
            return res.status(403).json({error: true, message: "This blog doesn't belong to you."})
        }

        await blog.deleteOne()
        res.send("OK")
    }catch(err){
        console.log(err)
        res.status(500)
        res.send("error")
    }
}

module.exports = { getBlogs, getBlogById, postNewBlog, deleteBlogById}