const { Worker } =require("bullmq");
const Scheduler=require("../models/schedulerModel");
require("dotenv").config
const config = require("../config/config")
const connection = { 
  host: process.env.HOST, 
  port: Number(process.env.REDIS_PORT)
};
const worker = new Worker("task", async job=>{
    console.log("job scheduled",job.data._id)
const task = await Scheduler.findOne({ _id: job.data._id});
if (task && task.status === "pending") {
      console.log(`Task ${task._id} is still pending. Sending notification...`);
      await Scheduler.updateOne({ _id: task._id },{ $set: { status: "overdue" } });
}
else{
    console.log(`Task ${task._id} already completed or not found.`)
}
 },
  { connection }
);

