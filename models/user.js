import mongoose, { Schema } from "mongoose";
// import { Express } from "express";

const userModel = new Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
   type:String,
   required:true
    },
    age:{
        type:Number,
        required:true
    }
})

const user = mongoose.model('user',userModel);
export default user;