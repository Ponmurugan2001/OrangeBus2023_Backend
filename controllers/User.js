const User=require("../models/User")

const bcrypt=require('bcryptjs')
const jwt = require("jsonwebtoken")


exports.createUser=async(req,res)=>{
    try {
        const existingUser= await User.findOne({emailID:req.body.emailID});
        if(existingUser){
            return res.status(200) .send({message:"user with email alrready exist",success:false})
        }
        const hashedPassword=await bcrypt.hash(req.body.password,6);
        req.body.password=hashedPassword;
        const newUser=new User(req.body)
        await newUser.save();
        return res.status(200) .send({message:"user account created",success:true})
        
    } catch (error) {
        console.log(error)
        return res.status(200) .send({message:"something went wrong on db",success:false})
    }
    
}
exports.loginUser=async(req,res)=>{
    
    try {
        console.log("insidet try" );
        const userexist= await User.findOne({emailID:req.body.emailID});
       
        if(!userexist){
            
            return res.status(200) .send({message:"user does not exist",success:false})

        }
        
        const passwordmatch = await bcrypt.compare(req.body.password, userexist.password );
        
        if(!passwordmatch){return res.status(200) .send({message:"incorrect password ",success:false})}
        const token =jwt.sign({userid:userexist._id},process.env.secret_token,{expiresIn:"1d"});

        return res.status(201) .send({message:"login succesfull",success:true,data: token })

        


        
    } catch (error) {
        console.log(error)
        return res.status(401) .send({message:"something went wrong on db",success:false})
        
    }
}