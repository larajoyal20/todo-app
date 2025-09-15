require("dotenv").config({ path: "../.env" }); // adjust path relative to worker.js

const { Worker } = require("bullmq");
const nodemailer = require("nodemailer");
const mongoose=require("mongoose");

const Scheduler = require("../models/schedulerModel");
const config = require("../config/config")
const connection = {
  host: process.env.HOST,
  port: process.env.REDIS_PORT,
};
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // e.g., "smtp.gmail.com"
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER, // your email
    pass: process.env.SMTP_PASS, // your email password / app password
  },
});
const worker = new Worker(
  "task",
  async (job) => {
    console.log("Job data received:", job.data);
    console.log("job scheduled", job.data._id);
    console.log("aab", await Scheduler.findById( job.data._id ));
    const task = await Scheduler.findById(job.data._id);
    console.log("aaa", task);
    if (task && task.status === "pending") {
      console.log(`Task ${task._id} is still pending. Sending notification...`);
      await Scheduler.updateOne(
        { _id: task._id },
        { $set: { status: "overdue" } }
      );
      try {
        await transporter.sendMail({
          from: `"todoapp" <${process.env.SMTP_USER}>`,
          to: task.email, // assumes your Scheduler schema has userEmail
          subject: `Overdue Task: ${task.title}`,
          text: `Hello,\n\nYour task "${task.title}" was due on ${task.duedate} and is still pending.\n\nPlease take action.`,
        });
        console.log("Email sent to:", task.email);
      } catch (err) {
        console.error("Error sending email:", err);
      }
    } else {
      console.log(`Task ${task._id} already completed or not found.`);
    }
  },
  { connection }
);
