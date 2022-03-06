import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userSchema = new Schema({
  firstname: { type: String, required: [true, "field required"] },
  lastname: { type: String, required: [true, "field required"] },
  username: { type: String, required: [true, "field required"] },
  email: {
    type: String,
    required: [true, "field required"],
    unique: true,
    trim: true,
  },
  password: { type: String, required: [true, "field required"] },

  user_type: { type: String, default: "user" },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

export default new mongoose.model("userSchema", userSchema);
