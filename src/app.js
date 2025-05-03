const express = require('express');
const app = express();
const { dbConnection } = require('./config/database')
const PORT = process.env.PORT || 8000;
const cookieParser = require("cookie-parser");
const cors = require('cors');


app.use(cors(
  {
    origin:"http://localhost:5173",
    credentials: true, 
  }
));
app.use(express.json()); // it is middleware here use is middleware convert json data in js object .
app.use(cookieParser())


const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const userRouter = require("./routes/user");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);


 

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
