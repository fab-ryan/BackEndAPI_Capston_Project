import mongoose from "mongoose";
import commentModel from "./commentModel.js";
const Schema = mongoose.Schema;
const blogSchema = new Schema({
  ArticleTitle: { type: String },
  ArticlePreview: { type: String },
  ArticleImage: { type: String },
  ArticleDescription: { type: String },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
    },
  ],
});

export default new mongoose.model("Blogs", blogSchema);
