const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const config=require("../config/config")
const userSchema=mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    },
    password:String,
})
userSchema.methods.generateAuthToken=function(){
    let token=jwt.sign({_id:this._id,email:this.email},config.JWT_TokenKey,{ expiresIn: "5m" })
    return token;
}
const Users=mongoose.model("to-do-user",userSchema);
module.exports=Users;