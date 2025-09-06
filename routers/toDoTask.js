const mongoose=require("mongoose");
const express=require("express");
const auth = require("../middleware/auth")
const router=express.Router();
const {
    createTask,
    UpdateTask,
    getAllTaskDetails,
    getTaskDetailsByID,
    deleteTask
}=require("../controllers/taskController");
router.post('/',auth,createTask);
router.get("/",auth,getAllTaskDetails)
router.get("/:id",auth,getTaskDetailsByID)
router.put("/:id",auth,UpdateTask)
router.delete("/:id",auth,deleteTask)
module.exports=router;