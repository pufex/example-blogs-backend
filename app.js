const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const morgan = require("morgan")
const cors = require("cors")
const {Blog} = require("./models/blog")
const blogRouter = require("./routers/blogsRouter")
const authRouter = require("./routers/authRouter")
const cookieParser = require("cookie-parser")

dotenv.config();

const app = express()

app.use(cors())
app.use(cookieParser())
app.use(morgan("dev"))
app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use("/auth", authRouter)
app.use(blogRouter)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to the database.")
        app.listen(3000)
    })
    .catch(err => {
        console.log(err)
    })

