import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.routes.js"

const app = express();

config({
  path: "./.env",
});

// using middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.CORS_ORIGIN],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// defining routes
app.use("/api/v1/users", userRouter);
// app.use("/api/v1/tasks",tasksRouter);

app.get("/", (req, res) => {
  res.send("working");
});

export default app;
