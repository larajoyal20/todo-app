const mongoose=require("mongoose");
const _=require("lodash");
const Users=require("../models/userModels");
const routers=require("../routers/users");
const {signUpDetails,UpdateUserDetails,signInCheck}=require("../validations/userJoiValidation");
const express=require("express");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const createUser= async(req,res)=>{
    let {error} = signUpDetails(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    let user=await Users.findOne({email:req.body.email});
    if(user){
        return res.send("User already Exist!!!");
    }
    user = new Users(_.pick(req.body,["email","password","name"]));
    let salt=await bcrypt.genSalt(10);
    user.password=await bcrypt.hash(user.password,salt);
    await user.save();
    return res.send("Acoount created",_.pick(user,["email","name"]))
}
const updateUser=async(req,res)=>{
    let {error} = UpdateUserDetails(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    let user=await Users.findById(req.params.id);
    if(!user){
        return res.send("User not exist");
    }
    user = await Users.findOne({email:req.body.email})
    if(user){
        return res.send("Email already exist");
    }
    let updateData={
        name:req.body.name,
        email: req.body.email
    }
    if(req.body.password){
        let salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(req.body.password, salt)
    }
     user = await Users.findByIdAndUpdate(req.params.id,updateData,{ new: true});
    return res.json({
      message: "User updated successfully",
      data: _.pick(user, ["_id", "name", "email"])
    });
}
const getUser=async(req,res)=>{
    try{
        let user = await Users.find();
        return res.send(user);
    }
    catch(error){
        return res.status(200).send(error.message)
    }
}
const getUserById= async(req,res)=>{
    try{
        let user = await Users.findById(req.params.id);
        if(!user){
            return res.send("User not exist");
        }
        return res.send(user);
    }
    catch(error){
        return res.send(error.message)
    }
}
const removeUser=async(req,res)=>{
    try{
        let user = await Users.findByIdAndDelete(req.params.id);
        if(!user){
            return res.send("User not exist");
        }
        return res.send("Deleted")
    }
    catch(error){
        return res.send(error.message)
    }
}
module.exports={
    createUser,
    updateUser,
    getUser,
    getUserById,
    removeUser
}