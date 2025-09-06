const mongoose=require("mongoose");
const Sessions=require("../models/sessionModel")
const logout=async(req,res)=>{
    let session_id=req.header("session-ID")
    await Sessions.findByIdAndDelete(session_id);
    res.send("Signout")
}
module.exports=logout;