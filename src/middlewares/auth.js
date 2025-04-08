const jwt = require('jsonwebtoken');
const User = require("../models/user");

const userAuth = async (req , res , next) => {
   
    try {
        const {token} = req.cookies;
        if(!token){
            throw new Error("Token is not valid!!!!")
        }
        const tokenPassword = "DEV@Tinder$754";
        const decodedObj = await jwt.verify(token , tokenPassword);
        const {_id} = decodedObj;
        const user = await User.findById(_id);
        if(!user){
            throw new Error("user not found ")
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(404).send("ERROR" + err.message)
    }

}

module.exports = {
    userAuth,
}