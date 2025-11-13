const express = require("express");
const { Blog } = require("../models/blog");
const {getBlogs, getBlogById, postNewBlog, deleteBlogById } = require("../controllers/blogControllers")

const blogsRouter = express.Router()

blogsRouter.get("/blogs", getBlogs)
blogsRouter.get("/blogs/:id", getBlogById)
blogsRouter.post("/blogs", postNewBlog)
blogsRouter.delete("/blogs/:id", deleteBlogById)

module.exports = blogsRouter