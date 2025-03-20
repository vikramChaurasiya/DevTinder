const express = require("express")
const app =express();
app.get("/user",(req, res)=>{
    res.send("server run")
})

app.listen(3000, ()=>{
    console.log("server is successfu;;y listening on port 3000...");
    
})