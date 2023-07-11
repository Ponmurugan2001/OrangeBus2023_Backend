const User=require("../models/User")

const bcrypt=require('bcryptjs')


exports.createUser=async(req,res)=>{
    try {
        const existingUser= await User.findOne({emailID:req.body.emailID});
        if(existingUser){
            return res.status(200) .send({message:"user with email alrready exist",success:false})
        }
        const hashedPassword=await bcrypt.hash(req.body.password,11);
        req.body.password=hashedPassword;
        const newUser=new User(req.body)
        await newUser.save();
        return res.status(200) .send({message:"user account created",success:true})
        
    } catch (error) {
        console.log(error)
        return res.status(401) .send({message:"something went wrong on db",success:false})
    }
    
}