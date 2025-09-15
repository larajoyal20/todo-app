const mongoose=require("mongoose");
const _=require("lodash");
const Task=require("../models/toDoTaskModel");
const scheduleTask=require("../scheduler/job")
const Users=require("../models/userModels")
const {createTaskCheck,updateTaskCheck}=require("../validations/taskJoiValidation");
const createTask=async(req,res)=>{
     let user_id=req.header("User_id");
        if(!user_id) {
            return res.status(400).send("User_Id not found");
        }   
        user=await Users.findById(user_id);
        if(!user){
            return res.status(404).send("Invalid User_id");
         }
    let task = new Task({
    ..._.pick(req.body, ["title", "description", "status", "priority", "duedate", "category"]),user:user._id});
    await task.save();
    if(req.body.duedate){
        scheduleTask({title:req.body.title,duedate:req.body.duedate,status:req.body.status,email:user.email})
    }
    return res.send(task)
}
const UpdateTask=async(req,res)=>{
    let user_id=req.header("User_id");
        if(!user_id) {
            return res.status(400).send("User_Id not found");
        }   
        user=await Users.findById(user_id);
        if(!user){
            return res.status(404).send("Invalid User_id");
         }
    let {error}=updateTaskCheck(req.body);
    if(error){
        return res.status(400).send(error.message);
    }
     // Log the ID to debug
        console.log("Updating task with ID:", req.params.id);

        // Check if ID is valid
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send("Invalid Task ID");
        }
    updatingTask= await Task.findByIdAndUpdate(req.params.id,_.pick(req.body,["title","description","priority","duedate","status","category"]),{new:true})
     if (!updatingTask) return res.status(400).send("Task not found");
    return res.send(updatingTask)
}
const getAllTaskDetails=async(req,res)=>{
    let user_id=req.header("user_id");
    if(!user_id) {
        return res.status(400).send("User_Id not found");
    }   
    user=await Users.findById(user_id);
    if(!user){
         return res.status(404).send("Invalid User_id");
        }
        let getTask= await Task.find({user:user_id});
        return res.send(getTask)
    }
const getTaskDetailsByID=async(req,res)=>{
    let user_id=req.header("user_id");
        if(!user_id) {
            return res.status(400).send("User_Id not found");
        }   
        user=await Users.findById(user_id);
        if(!user){
            return res.status(404).send("Invalid User_id");
         }
    let getTask=await Task.findById(req.params.id);
    if(!getTask){
        return res.status(404).send("Task not found or you don't have access");
    }
    return res.send(getTask);
}
const deleteTask=async(req,res)=>{
    let user_id=req.header("User_id");
        if(!user_id) {
            return res.status(400).send("User_Id not found");
        }   
        user=await Users.findById(user_id);
        if(!user){
            return res.status(404).send("Invalid User_id");
         }
    let removeTask=await Task.findByIdAndDelete(req.params.id)
    if(!removeTask){
        return res.status(400).send("Task not found");
    }
    return res.send(removeTask);
}

module.exports={createTask,UpdateTask,getAllTaskDetails,getTaskDetailsByID,deleteTask};