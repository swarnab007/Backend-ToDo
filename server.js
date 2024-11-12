import app from "./app.js"
import { connectDB } from "./db/database.js";
import { config } from "dotenv";

config({
    path: "./.env",
  });
// connectDB();

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
})