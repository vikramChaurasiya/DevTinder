const express = require('express');
const app = express();
const { dbConnection } = require('./config/database')
const PORT = process.env.PORT || 8000;
const User = require("./models/user");
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");


app.use(express.json()); // it is middleware here use is middleware convert json data in js object .
app.use(cookieParser())

app.post("/signup", async(req, res) => {

  try {
    //validation of data
    validateSignUpData(req)

    //Encrypt the password
    const {firstName,lastName,emailId,password} = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    
    // creating a new instance of the user models 
    const user = new User({
      firstName,
      lastName,
      emailId,
      password:passwordHash,
    });

 
    await user.save();
    res.send("User added successfully");
 } catch (err) {
  res.status(400).send("ERROR:"+ err.message)
 }

});

app.post("/login" , async(req,res)=>{
  try {
    const {emailId, password} = req.body;
    const user = await User.findOne({emailId:emailId});
    if(!user){
      throw new Error("Invalid credentials!!");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(isPasswordValid){

      // create a JWT token
      const tokenPassword = "DEV@Tinder$754";
      const token = await jwt.sign({_id: user._id}, tokenPassword);
      // console.log(token);
      

      // Add the token to cookie and send the response back the user
      res.cookie("token", token);
      res.send("Login successful!! ")
    }else{
      throw new Error("Invalid credentials!!")
    }

  } catch (err) {
    res.status(400).send("ERROR : " + err.message)
  }
});

// profile API
app.get("/profile", async(req, res)=>{
  try {
    const cookies = req.cookies;
    const {token} = cookies;
    // validate my token
    if (!token) {
      throw new Error("invalid Token")
    }
    const tokenPassword = "DEV@Tinder$754";
    const decodedMesssage = await jwt.verify(token,tokenPassword)
    const{_id} = decodedMesssage;
    // console.log("Logged In user is: " + _id);   
    const user =  await User.findById(_id);
    if(!user){
      throw new Error("User doesn't found");
    }
 
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : "+err.message)
  }
})


//it is find user through searching email 
app.get("/user", async(req,res)=>{
  const userEmail = req.body.emailId;
  try {
    const users = await User.findOne({emailId: userEmail});
    if (users.length === 0) {
      res.status(404).send("user can't found");
    }else{
      res.send(users)
    }
  } catch (err) {
    res.status(400).send("something went wrong" +err.message)
  }
})

//it has all without any searching same like feed
app.get("/feed", async(req, res)=>{
  try {
    const users = await User.find();
    res.send(users)
  } catch (err) {
    res.status(400).send("something went wrong"+err.message)
  }
})

//delete user from the databased 

app.delete("/user" , async(req,res) =>{
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({_id:userId});
    res.send("user deleted successfully")
  } catch (err) {
    res.status(400).send("somthing went wrong"+err.message)
  }
})

//update date from database.
app.patch("/user/:userId", async(req,res)=>{
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = [
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
    ];
    const isUpdateAllowed = Object.keys(data).every((k)=>
      ALLOWED_UPDATES.includes(k)
    );
    if(!isUpdateAllowed){
      throw new Error("Update not allowed")
    }
    if(data?.skills.length > 10){
      throw new Error("Skills cannot more than 10 ")
    }
    const user = await User.findByIdAndUpdate({_id:userId}, data ,{
      returnDocument:'after',
      returnValidators:true,
    });
    console.log(user);
    res.send("User is successfully updated")
  } catch (err) {
    res.status(400).send("UPDATE FAILED "+err.message)
  }
})

app.patch("/users  ", async (req,res)=>{
  const userEmail = req.body.emailId;
  const data = req.body;
  
  try {
    await User.findOneAndUpdate({emailId:userEmail}, data);
    res.send("user data is successfully updated ")
  } catch (err) {
    res.status(400).send("something went wrong" + err.message)
  }

})

dbConnection()
.then(()=>{
  console.log('Database is successfully connected!')
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
  })
})
.catch((err)=>{
  console.log("databased not connect",err);
    
})
