import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import taskRouter from "./routes/tasks.routes.js";
import { errorMiddleware } from "./middlewares/error.js";

const app = express();
app.use(cors());

config({
  path: "./.env",
});

// using middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://frontend-to-do-mu.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


// defining routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

app.get("/", (req, res) => {
  res.send("working");
});

app.use(errorMiddleware);
export default app;
