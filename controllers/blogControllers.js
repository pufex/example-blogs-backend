const {Blog} = require("../models/blog")

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
            res.status(404)
            res.send(null)
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
        const blog = await new Blog(req.body);
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
        await Blog.findByIdAndDelete(blog_id);
        res.send("OK")
    }catch(err){
        console.log(err)
        res.status(500)
        res.send("error")
    }
}

module.exports = { getBlogs, getBlogById, postNewBlog, deleteBlogById}