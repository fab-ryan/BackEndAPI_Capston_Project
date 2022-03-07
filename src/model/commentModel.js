import mongoose from "mongoose";

const Schema = mongoose.Schema;
const commentSchema = new Schema({
  fullname: {
    type: String,
    required: [true, "field is required"],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, "field is required"],
  },
  comment: {
    type: String,
    required: [true, "field is required"],
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  blogPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "blogSchema",
  },
});
export default new mongoose.model("commentSchema", commentSchema);
