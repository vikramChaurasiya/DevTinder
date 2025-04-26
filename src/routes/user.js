const express = require('express');
const userRouter= express.Router();
const {userAuth} = require("../middlewares/auth")

userRouter.get("/user/request", userAuth,async (req, res)=>{
    try {
        const loggedInUser = req.user
        
    } catch (err) {
        req.statusCode(400).send("ERROR " + err.message)
    }
})

module.exports = userRouter;
