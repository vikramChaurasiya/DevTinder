const express = require('express');
const app = express();
const { dbConnection } = require('./config/database')
const PORT = process.env.PORT || 8000;
const User = require("./models/user");
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const {userAuth}= require("./middlewares/auth");


app.use(express.json()); // it is middleware here use is middleware convert json data in js object .
app.use(cookieParser())

app.post("/signup", async(req, res) => {

  try {
    //validation of data
    validateSignUpData(req)

    //Encrypt the password
    const {firstName,lastName,emailId,password} = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);
    
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

// profile API
app.get("/profile",userAuth, async(req, res)=>{
  //here in userAuth is middleware
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : "+err.message)
  }
})

app.post("/sendConnectionRequest", userAuth , async (req,res)=>{
  const user = req.user;
  // sending a connection request
  console.log("Sending a connection request");
  res.send(user.firstName + "sent the connection request");
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
