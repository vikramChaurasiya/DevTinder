const express = require('express');
const userRouter= express.Router();
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require('../models/connectionRequest');

// get all the pending connnection request for the loggedIn user
userRouter.get("/user/request/received", userAuth,async (req, res)=>{
    try {
        const loggedInUser = req.user

        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate(
            "fromUserId", 
            "firstName lastName photoUrl age gender about skills"
        );
        // }).populate("fromUserId", ["firstName", "lastName"]);


        res.json({
            message: "Data fetch successfully",
            data:connectionRequests
        })
        
    } catch (err) {
        req.statusCode(400).send("ERROR " + err.message)
    }
})

module.exports = userRouter;
