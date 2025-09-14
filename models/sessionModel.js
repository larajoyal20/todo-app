const mongoose=require("mongoose");
const sessionSchema=mongoose.Schema({
    token:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    createdAt: {
         type: Date,
         default: Date.now,
         expires: 600
  }
},{ timestamps: true })
const session=mongoose.model("session",sessionSchema);
module.exports=session;