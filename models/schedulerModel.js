const mongoose=require("mongoose");
const schedulerSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    duedate:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }
});
const Scheduler=mongoose.model("SchedulerTask",schedulerSchema);

module.exports= Scheduler;