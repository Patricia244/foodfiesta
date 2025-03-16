import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrpty from 'bcrypt'
import validator from 'validator'


const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

export const loginUser = async (req, res)=>{
const  {password,email} = req.body

try {
    const user = await userModel.findOne({ email: email })
    if(!user){
        return res.json({success:false, message:"User does not exists"})
    }
    const isMatch = await bcrpty.compare(password,user.password)
    if(!isMatch){
        return res.json({success:false, message:"Invalid password"})
    }

    const token = createToken(user._id)
    res.json({success:true,token})

} catch (error) {
    res.json({success:false, message:error.message})
}
}

export const registerUser = async (req,res)=>{
const {userName,password, email} = req.body
try {
    const exists = await userModel.findOne({ email: email })
    if(exists){
        return res.json({success:false, message:"user already exists"})
    }
    if(!validator.isEmail(email)){
         return res.json({success:false, message:"Please enter valid email"})
    }
    if(!password.length >= 8 ){
        return res.json({success:false, message:"please enter strong password"})
    }
    // hashing user password
    const salt = await bcrpty.genSalt(10)
    const hashedPassword = await bcrpty.hash(password,salt)

    const newUserModel = new userModel({
        userName:userName,email:email,password:hashedPassword
    })
   const user = await  newUserModel.save()
   const token = createToken(user._id)
   res.json({success:true,token})

} catch (error) {
    res.json({success:false,message:error})
}
}