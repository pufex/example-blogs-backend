const mongoose = require("mongoose")
const Schema = mongoose.Schema

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    }
}, {timestamps: true})

const Blog = mongoose.model("Blog", BlogSchema)

module.exports = {Blog}