import mongoose from "mongoose";
const Schema = mongoose.Schema;
const messageSchema = new Schema({
  name: String,
  email: String,
  message: String,
  date: Date,
});
export default new mongoose.model("messageSchema", messageSchema);
