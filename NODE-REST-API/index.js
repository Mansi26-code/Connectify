const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute=require("./routes/users");
const authRoute=require("./routes/auth");
const postRoute=require("./routes/posts");

dotenv.config();

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/social";

async function connectToDB() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");
  } catch (error) {
    console.error("Failed to connect to DB", error);
    process.exit(1); // Exit the process with failure
  }
};

connectToDB();
 // Don't forget to call the function to connect to the DB
 app.use(express.json());
 app.use(helmet());
 app.use(morgan("common"));
 app.use("/api/users",userRoute);
 app.use("/api/auth", authRoute);
 app.use("/api/posts", postRoute);


 app.get("/",(req,res)=>{
     res.send("Welcome to home page");
 });

 app.get("/users",(req,res)=>{
    res.send("Welcome to user's page");
});


app.listen(8800, () => {
  console.log("Backend Server is listening on port 8800");
});

