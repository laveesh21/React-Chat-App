import express from "express";
import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";

const router = express.Router();

const login = async(req,res) =>{
    try{

        const{username, password} = req.body
        
        
        if (!username || !password) {
            return res.status(400).json({ message: "Please provide all required fields." });
        }
        
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Username doesn't exit! " });
        }

        
        const isPasswordCorrect = user.isPasswordCorrect(password)
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Incorrect password.' });
        }
        console.log('Trigger')
    
        const token = await user.generateAccessTokenAndSetCookie(res);

        res.status(201).json({ message: "Login successfull", token });
    }catch(err){
        console.error('Error during login:', err);
        res.status(500).json({ message: 'SERVER ERROR: Unable to process login.'});
    }
}

const signup =  async (req, res) => {
    try {
        const { fullname, username, email, password } = req.body;

        if (!fullname || !username || !email || !password) {
            return res.status(400).json({ message: "Please provide all required fields." });
        }

        const existingUser = await User.findOne({ $or: [{ username }, { email }], });
        if (existingUser) {
            return res.status(400).json({ message: "Username or email already exists." });
        }

        const user = new User({
            fullname,
            username,
            email,
        });

        const hashedPassword = await user.generateHashPassword(password)
        user.password = hashedPassword

        await user.save();

        const token = await user.generateAccessTokenAndSetCookie(res);  

        res.status(201).json({ message: "User created successfully.", token });

    } catch (error) {
        res.status(500).json({
            message: "SERVER ERROR: Error while creating user",
        });
    }
}

export {login, signup};
