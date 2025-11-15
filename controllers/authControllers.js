const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const registerUser = async (req, res) => {
    const {username, password} = req.body
    const existing_user = await User.findOne({username})
    console.log(existing_user)
    if(existing_user){
        res.status(400)
        return res.json({error: true, message: "This user already exists"})
    }
    hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({username, password: hashedPassword})
    await user.save();
    res.sendStatus(200)
}

const loginUser = async (req, res) => {
    const {username, password} = req.body
    const existing_user = await User.findOne({username}) 
    if(!existing_user){
        res.status(404)
        return res.json({error: true, message: "User not found"})
    }
    const isMatching = bcrypt.compare(password, existing_user.password)
    if(!isMatching){
        res.status(401)
        return res.json({error: true, message: "Wrong username or password"})
    }
    const refreshToken = jwt.sign(
        {username, _id: existing_user._id},
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "30d" }
    )
    const accessToken = jwt.sign(
        {username, _id: existing_user._id},
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
    )
    res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30 })
    res.status(200)
    res.json({accessToken, user: existing_user})
}

const refreshToken = async (req, res) => {
    const token = req.cookies?.jwt ?? ""
    if(!token){
        return res.sendStatus(401)
    }

    jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if(err){
                return res.sendStatus(403)
            }

            const user_id = decoded._id
            const user = await User.findById(user_id)
            if(!user){
                return res.sendStatus(401)
            }

            const accessToken = jwt.sign(
                {username: user.username, _id: user._id},
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "15m" }
            )
            res.json({accessToken, user})
        }
    )
}

const logoutUser = (req, res) => {
    const token = req.cookies.jwt;
    res.clearCookie("jwt", { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30 })
    res.sendStatus(200)
}

module.exports = {registerUser, loginUser, refreshToken, logoutUser}