require("dotenv").config();
const mongoose = require("mongoose");
const {
  NODE_ENV,
  PORT,
  MONGODB_HOST,
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_DATABASE,
  JWT_TokenKey,
  HOST,
  REDIS_PORT,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
} = process.env;

/*
Check the user and password from the dotenv
encodeURIcomponent using for change the symbols from pa$$word@123 to pa%24%24word%40123
if not user and password present set empty
*/
console.log(process.env, MONGODB_USER, MONGODB_PASSWORD);
const credentials =
  MONGODB_USER && MONGODB_PASSWORD
    ? `${encodeURIComponent(MONGODB_USER)}:${encodeURIComponent(
        MONGODB_PASSWORD
      )}@`
    : "";
const node_env = NODE_ENV || "development";
const port = PORT || "3000";
const mongoURI = `mongodb+srv://${credentials}${MONGODB_HOST}/${MONGODB_DATABASE}?authsource=admin`;
mongoose
  .connect(mongoURI)
  .then(() => console.log("connection established"))
  .catch((err) => console.log("connection not established", err.message));

module.exports = {
  node_env,
  port,
  mongoURI,
  JWT_TokenKey,
  HOST,
  REDIS_PORT,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
};
