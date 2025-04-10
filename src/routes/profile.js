const express = require('express');
const profileRouter = express.Router();
const {userAuth}= require("../middlewares/auth");
const {validateEditProfileData} = require("../utils/validation");

profileRouter.get("/profile/view",userAuth, async(req, res)=>{
    //here in userAuth is middleware
    try {
      const user = req.user;
      res.send(user);
    } catch (err) {
      res.status(400).send("ERROR : "+err.message)
    }
})

profileRouter.patch("/profile/edit",userAuth, async(req, res)=>{
  try {
    if(!validateEditProfileData){
      throw new error("Invalid edit request");
    }
    
    const loggedInUser = req.user
    Object.keys(req.body).forEach((key)=> (loggedInUser[key] = req.body[key])) //update data
    await loggedInUser.save();
  
    res.json({
      message: `${loggedInUser.firstName}, your profile updated successful`,
      data: loggedInUser,
    })
    
  } catch (err) {
    res.status(400).send("ERROR : "+ err.message);
  }
})

module.exports = profileRouter;