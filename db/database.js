import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://swarnabmessibanerjee:swarnab2003@cluster0.beihteh.mongodb.net/"
    )
    .then(() => console.log("Database connected"))
    .catch((error) => console.log("error connecting to DataBase", error));
};
