const express = require("express");
const { Blog } = require("../models/blog");
const verifyJWT = require("../middleware/verifyJWT")
const {getBlogs, getBlogById, postNewBlog, deleteBlogById } = require("../controllers/blogControllers")

const blogsRouter = express.Router()

blogsRouter.get("/blogs", getBlogs)
blogsRouter.get("/blogs/:id", getBlogById)
blogsRouter.post("/blogs", verifyJWT, postNewBlog)
blogsRouter.delete("/blogs/:id", verifyJWT, deleteBlogById)

module.exports = blogsRouter