const express = require('express');
const userRouter= express.Router();
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

// get all the pending connnection request for the loggedIn user
userRouter.get("/user/request/received", userAuth,async (req, res)=>{
    try {
        const loggedInUser = req.user

        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate(
            "fromUserId", 
           USER_SAFE_DATA
        );
        // }).populate("fromUserId", ["firstName", "lastName"]);


        res.json({
            message: "Data fetch successfully",
            data:connectionRequests
        })
        
    } catch (err) {
        res.statusCode(400).send("ERROR " + err.message)
    }
})


userRouter.get("/user/connections", userAuth,async(req,res)=>{
    try {
        const loggedInUser = req.user;
        
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                {toUserId: loggedInUser._id, status:"accepted"},
                {fromUserId:loggedInUser.id, status:"accepted"}
            ]
        }).populate("fromUserId" ,USER_SAFE_DATA ).populate("toUserId", USER_SAFE_DATA);

        const data = connectionRequests.map((row) => {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId
            }
            return row.fromUserId
        });

        res.json({ data});
    } catch (err) {
        res.status(400).send({message : err.message })
    }
})

userRouter.get("/user/feed", userAuth, async (req, res) =>{
    try {
        const loggedInUser = req.user;
        
        // find all the connection request (sent+ received)

        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id },
            ],
        }).select("fromUserId toUesrId")
        
        const hideUsersFromFeed = new Set()
        
        connectionRequests.forEach((req) => {
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId);
        })
      
        const users = await User.find({
            $and:[
                { _id: { $nin: Array.from(hideUsersFromFeed)}},
                { _id:{ $ne: loggedInUser._id} },
            ],
        }).select(USER_SAFE_DATA);

        res.send(users)

    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

module.exports = userRouter;
