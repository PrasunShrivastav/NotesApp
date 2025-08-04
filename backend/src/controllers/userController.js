import User from "../model/User.js";
import mongoose from "mongoose";
export async function signup(req , res ){
    username = req.body.username;
    password = req.body.password;
    try {
        await User.create({username , password})
    } catch (error) {
        console.log(error);
        res.status(400).json({message : "username already exists"})
    }
}
export async function signin (req , res ){

}