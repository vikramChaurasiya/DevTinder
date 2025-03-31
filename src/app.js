const express = require('express');
const app = express();
const { dbConnection } = require('./config/database')
const PORT = process.env.PORT || 8000;
const User = require("./models/user")

app.use(express.json()); // it is middleware here use is middleware convert json data in js object .

app.post("/signup", async(req, res) => {
  // creating a new instance of the user models 
  const user = new User(req.body);

 try {
  await user.save();
  res.send("User added successfully");
 } catch (err) {
  res.status(400).send("error saving the user:"+ err.message)
 }

});

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
app.patch("/user", async(req,res)=>{
  const userId = req.body.userId;
  const data = req.body;
  try {
    await User.findByIdAndUpdate({_id:userId}, data);
    res.send("User is successfully updated")
  } catch (err) {
    res.status(400).send("Something went wrong ")
  }
})

app.patch("/users", async (req,res)=>{
  const userEmail = req.body.emailId;
  console.log(userEmail);
  
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
