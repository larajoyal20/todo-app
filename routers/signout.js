const mongoose=require("mongoose");
const express=require("express");
const auth = require("../middleware/auth");
const logout=require("../controllers/signoutController")
const router=express.Router();
router.post('/',auth,logout)
module.exports=router;
