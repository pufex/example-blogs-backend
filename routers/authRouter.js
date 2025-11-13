const express = require("express")
const {registerUser, loginUser, refreshToken, logoutUser} = require("../controllers/authControllers")

const authRouter = express.Router()

authRouter.post("/register", registerUser)
authRouter.get("/login", loginUser)
authRouter.get("/refresh-token", refreshToken)
authRouter.get("/logout", logoutUser)

module.exports = authRouter