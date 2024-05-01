import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import taskRouter from "./routes/tasks.routes.js";
import { errorMiddleware } from "./middlewares/error.js";

import { User } from "./models/user.model.js";
import { ErrorHandler } from "./middlewares/error.js";
import bcrypt from "bcrypt";  
import { sendCookie } from "./utils/features.js";   
import bodyParser from "body-parser";         

const app = express();

config({
  path: "./.env",
});

// using middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin','https://frontend-to-do-mu.vercel.app' );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,token');
  res.header('Access-Control-Allow-Credentials', 'true'); // Allow credentials

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});


// defining routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

app.get("/", (req, res) => {
  res.send("working");
});
app.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;
    console.log(username);
    let user = await User.findOne({username}).select("+password");
    
    if (!user) return res.send(new ErrorHandler("Register First", 400));
    const isMatchedPass = bcrypt.compare(password, user.password);
    if (!isMatchedPass)
      return res.send(new ErrorHandler("Wrong Password !", 400));

    sendCookie(user, res, `Welcome Back ${user.fullname}`, 200);
  } catch (error) {
    console.log(error);
    // next(error);
  }
})

app.use(errorMiddleware);
export default app;
