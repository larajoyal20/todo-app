const mongoose=require("mongoose");
const sessionSchema=mongoose.Schema({
    token:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        required:true
    }
},{ timestamps: true })
const session=mongoose.model("session",sessionSchema);
module.exports=session;