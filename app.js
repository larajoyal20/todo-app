require("dotenv").config()
const mongoose = require("mongoose");
const express=require("express");
const { node_env, port } = require("./config/config");
const users=require("./routers/users")
const auth=require("./routers/auth")
const task=require("./routers/toDoTask")
const signout=require("./routers/signout")
const app = express();
app.use(express.json());
app.use("/api/users",users);
app.use("/api/signin",auth);
app.use("/api/Task",task);
app.use("/api/signout",signout)
const environment = process.env.environment||"development";
const setPort = process.env.port||"3000";
app.listen(setPort);
