import app from "./app.js"
import { connectDB } from "./db/database.js";

connectDB();
app.listen(3000, () => {
    console.log(`Server is listening`);
})