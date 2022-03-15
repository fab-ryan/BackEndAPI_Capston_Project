import mongoose from "mongoose";
import config from "../config.js";
const { db } = config;
const dbconnect = mongoose
  .connect(db)
  .then(() => {
    console.log("db connected 🌐");
  })
  .catch((e) => {
    console.log("MongDB connection error", e.message);
  });
export { dbconnect as default };
