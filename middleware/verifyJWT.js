const jwt = require("jsonwebtoken")
const User = require("../models/user")

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    if(!authHeader) {
        return res.sendStatus(401)
    }
    const token = authHeader.split(' ')[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, decoded) => {
            if(err){
                return res.sendStatus(401)
            }
            const user_id = decoded._id ?? ""
            const user = await User.findById(user_id)
            if(!user){
                return res.sendStatus(401)
            }else{
                req.user = user
                next()
            }
        }
    )
}

module.exports = verifyJWT; 