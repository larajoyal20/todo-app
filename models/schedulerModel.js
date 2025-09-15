const mongoose=require("mongoose");
const validator=require("validator");
const schedulerSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    duedate:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:[true, "Email is required"],
        validate:{
            validator:validator.isEmail,
            message: "Please enter a valid email"
        }
    }

});
const Scheduler=mongoose.model("SchedulerTask",schedulerSchema);

module.exports= Scheduler;