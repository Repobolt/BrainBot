import { isErrored } from "stream";
import User from "../models/User.js";
import { NextFunction,Request,Response } from "express";
import { hash,compare  } from "bcrypt" ;
import Router from "express"
import { createToken } from "../utils/token-manager.js";
import path from "path";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUsers =async (
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    try{ 
        //user -login
 
        const user=await User.find();
        return res.status(200).json({message:"ok",User})}
        catch(error){
         console.log(error);    
         return res.status(200).json({message:"ERROR", cause:error.message});     
        }
    };

const userRoutes=Router();
userRoutes.get("/",getAllUsers);
userRoutes.post("/signup")



export const  userSignup  =async (
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    try{
        //user signup
        const {name ,email, password}=req.body;
       
        const existingUser =await User.findOne({email});
        if(existingUser) return res.status(401).send("user is already registered");
        const hashpassword =await hash(password,10)
        const user=new User({name,email,password:hashpassword})
        await user.save();
        //----------- cookies wala part
        res.clearCookie(COOKIE_NAME, {domain:"localhost",
            httpOnly:true,
            path:"/",
            signed:true}
           )
           
        const token=createToken(user._id.toString(),user.email,"7d")
        const expires=new Date();
        expires.setDate(expires.getDate()+7);
        res.cookie(COOKIE_NAME,token,{
            path:"/",
            domain:"localhost",
            expires,
            httpOnly:true,
            signed:true,
        
        })
 //----------------------cookies  wala poart after signup
        return res.status(201).json({message:"ok",id:user._id.toString() })}
        catch(error){
         console.log(error);    
         return res.status(200).json({message:"ERROR", cause:error.message});     
        }
    };
    
export const  userLogin  =async (
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    try{
        //user login //we setted cookies 
        const {email, password}=req.body;
        const user=await User.findOne({email}); 
      if(!user){
        return res.status(401).send("user is not registered")
      }
      const isPasswordCorrect=await compare(password,user.password)

     if(!isPasswordCorrect){
        return res.status(403).send("Incorrect password")
     }
   //if cookieex expired then:
   res.clearCookie(COOKIE_NAME, {domain:"localhost",
    httpOnly:true,
    path:"/",
    signed:true}
   )
   
const token=createToken(user._id.toString(),user.email,"7d")
const expires=new Date();
expires.setDate(expires.getDate()+7);
res.cookie(COOKIE_NAME,token,{
    path:"/",
    domain:"localhost",
    expires,
    httpOnly:true,
    signed:true,

})

    }
        catch (error){
       console.log(error)
       return res.status(200).json({message:"ERROR",cause:error.message})
        }
    }; 


    
export default userRoutes