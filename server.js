import app from "./app.js"
import { connectDB } from "./db/database.js";
import { config } from "dotenv";

config({
    path: "./.env",
  });
connectDB();
app.listen(process.env.PORT, () => {
    console.log(`Server is listening ${process.env.PORT}`);
})