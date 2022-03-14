import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const dbconnect = mongoose
  .connect(process.env.MONG_URL)
  .then(()=>console.log("db connected 🌐"));
export { dbconnect as default };
