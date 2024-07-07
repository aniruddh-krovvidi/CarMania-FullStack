import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const register = async (req,res)=>{
    const {username,email,password} = req.body;
    try{
        const encryptPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data:{
                username,
                email,
                password: encryptPassword,
            },
        });
        res.status(201).json({message: "User created!"});   
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: "Failed to create user"});
    }
};
export const login = async (req,res)=>{
    const {username,password} = req.body;
    try{
        //User existential check
        const user = await prisma.user.findUnique({
            where:{username:username}
        })
        if(!user) return res.status(401).json({message: "User does not exist"});

        const isValidPassWord = await bcrypt.compare(password, user.password);
        if(!isValidPassWord) return res.status(401).json({message: "Incorrect Password"});

        const sessionTime = 1000*60*24*60*4 //4 days

        const token = jwt.sign({
            id:user.id
        }, process.env.JWT_SECRET_KEY, {expiresIn:sessionTime});
        const {password: dummyPassword, ...userInfo} = user;

        //Cookie generation
        res.cookie("token",token,{
            //Client-side JS cannot access cookie
            httpOnly:true,
            //secure:true
            maxAge: sessionTime,
        }).status(200).json({userInfo});
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: "Failed to Login"});
    }
    
};
export const logout = (req,res)=>{
    res.clearCookie("token").status(200).json({message:"Logged Out!"})
};