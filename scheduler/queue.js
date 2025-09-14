require("dotenv").config();
const {Queue}=require("bullmq");
const config=require("../config/config")
const connection={
    host:process.env.HOST,
    port: Number(process.env.REDIS_PORT)
}
const taskQueue=new Queue("task",{connection})
console.log("redis connected")
module.exports=taskQueue;