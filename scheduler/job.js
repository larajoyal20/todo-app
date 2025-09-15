const mongoose=require("mongoose");
const Queue=require('./queue')
const Scheduler=require("../models/schedulerModel")
async function schedulerTask(task){
    let schedulertask=new Scheduler(task);
    await schedulertask.save()
    const now=Date.now();
    const delay=new Date(task.duedate).getTime() - now;
        console.log(delay)
        await Queue.add("task",{ _id: schedulertask._id },{ delay: delay > 0 ? delay : 0 } )
        console.log(`Task scheduled for ${task.duedate}`)
}
module.exports = schedulerTask;