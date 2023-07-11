const express= require('express');

const userRouter=require("./routes/User")
const app= express();
require('dotenv').config();
const dbconfig =require("./config/dbConfig")
app.use(express.json())

// http://localhost:9000/api/user/register
app.use('/api/user',userRouter)
app.get("/",(req,res)=>{
    res.send("welcome to backend")
});

app.listen(9000,()=>{console.log("The port is listening on 9000")});