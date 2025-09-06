const mongoose=require("mongoose");
const express=require("express");
const router=express.Router();
const {
    createUser,
    updateUser,
    getUser,
    getUserById,
    removeUser
} = require("../controllers/userControllers");
router.get("/",getUser);
router.get("/:id",getUserById);
router.post("/",createUser);
router.put("/:id",updateUser);
router.delete("/:id",removeUser);

module.exports=router
