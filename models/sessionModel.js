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
  }
},{ timestamps: true })
sessionSchema.index({ createdAt: 1 }, { expireAfterSeconds: 120 });
const session=mongoose.model("session",sessionSchema);
module.exports=session;