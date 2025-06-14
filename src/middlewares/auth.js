const jwt = require('jsonwebtoken');
const User = require("../models/user");
require('dotenv').config();

const userAuth = async (req , res , next) => {
   
    try {
        const {token} = req.cookies;
        if(!token){
            // throw new Error("Token is not valid!!!!")
            return res.status(401).send("Please Login!")
        }
        const tokenPassword = process.env.JWT_TOKEN;
        const decodedObj = await jwt.verify(token , tokenPassword);
        const {_id} = decodedObj;
        const user = await User.findById(_id);
        if(!user){
            throw new Error("user not found ")
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(404).send("ERROR : " + err.message)
    }

}

module.exports = {
    userAuth,
}