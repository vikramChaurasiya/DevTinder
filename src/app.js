const express = require('express');
const app = express();
const { dbConnection } = require('./config/database')
const PORT = process.env.PORT || 8000;
const User = require("./models/user")

app.use(express.json());

app.post("/signup", async(req, res) => {
  // creating a new instance of the user models 
  const user = new User(req.body);

 try {
  await user.save();
  res.send("User added successfully");
 } catch (err) {
  res.status(400).send("error saving the user:",err.message)
 }

});



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
