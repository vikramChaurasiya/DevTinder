const express = require('express');
const app = express();
const { dbConnection } = require('./config/database')

const PORT = process.env.PORT || 8000;
dbConnection().then(()=>{
  console.log('Database is successfully connected!')
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
  })
}).catch((err)=>{
  console.log("databased not connect",err);
    
})
