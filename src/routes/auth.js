const express = require('express');
const authRouter = express.Router();
const {validateSignUpData} = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async(req, res) => {

  try{
    //validation of data
    validateSignUpData(req)
   //Encrypt the password
    const {firstName,lastName,emailId,password,skills,age,photoUrl,gender,about} = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);
   // creating a new instance of the user models 
    const user = new User({
      firstName,
      lastName,
      emailId,
      password:passwordHash,
      skills,
      age,
      photoUrl,
      gender,
      about
    });
  
   await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("ERROR : "+ err.message)
  }

});

authRouter.post("/login" , async(req,res)=>{
    try {
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId:emailId});
        if(!user){
          throw new Error("Invalid credentials!!");
        }
        const isPasswordValid = await user.validatePassword(password);

        if(isPasswordValid){

          const token = await user.getJWT();
        
          // Add the token to cookie and send the response back the user
          res.cookie("token", token , {
            expires: new Date(Date.now()+8*3600000)
          });
          res.send("Login successful!! ")
        }else{
          throw new Error("Invalid credentials!!")
        }
  
    } catch (err) {
        res.status(400).send("ERROR : " + err.message)
    }
});
  
authRouter.post("/logout", async(req,res)=>{
  res.cookie("token", null, {
    expires: new Date(Date.now())
  });
  res.send("Logout successful");
})

module.exports = authRouter;