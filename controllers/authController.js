const mongoose=require("mongoose");
const _=require("lodash");
const Users=require("../models/userModels");
const Session=require("../models/sessionModel")
const {signInCheck}=require("../validations/userJoiValidation");
const bcrypt=require("bcrypt");


const signin=async(req,res)=>{
    let {error}=signInCheck(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
     try {
    // User can pass either email or name
    let user = await Users.findOne({
      $or: [
        { email: req.body.email },
        { name: req.body.name }
      ]
    });

    if (!user) {
      return res.status(400).send("Invalid email/username or password");
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).send("Invalid email/username or password");
    }
    let token=user.generateAuthToken();
    let session=new Session({token,user_id:user._id})
    await session.save()

    return res.set({"x-auth-token":token,"session-ID":session._id, "User_id":user._id}).send( {message: "Login successful",
      data: { _id: user._id, name: user.name, email: user.email }
    });

  } catch (err) {
    return res.status(500).send(err.message);
  }
};
module.exports=signin;