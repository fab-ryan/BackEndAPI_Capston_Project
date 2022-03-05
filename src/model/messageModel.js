import mongoose from "mongoose";
const Schema = mongoose.Schema;
const messageSchema = new Schema({
  name: String,
  email: { type: String, trim: true },
  message: String,
  createDate: Date,
});
export default new mongoose.model("messageSchema", messageSchema);
