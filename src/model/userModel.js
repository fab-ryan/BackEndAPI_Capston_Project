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
    lowercase: true,
  },
  password: { type: String, required: [true, "field required"] },

  role: { type: String, default: "user", enum: ["user", "admin"] },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

export default new mongoose.model("Users", userSchema);
