const jwt=require('jsonwebtoken');
const config=require("../config/config")
const Sessions=require("../models/sessionModel")
module.exports= async function (req,res,next){
     console.log(req.headers); 
     const session_Id=req.header("session-ID");
     const token=req.header('x-auth-token');
    if(!token&&!session_Id) return res.status(401).send("No Token.Access Denied");
    try{
        let session= await Sessions.findById(session_Id)
        console.log(session)
        if(session.token!==token){
            throw new Error();
        }
        const decoded = jwt.verify(token,process.env.JWT_TokenKey)
        req.user=decoded;
        console.log(req.user,"auth executed successfully")
        next()
    }
    catch(error){
        console.log(error.stack)
        res.status(400).send("invalid token")
    }
}