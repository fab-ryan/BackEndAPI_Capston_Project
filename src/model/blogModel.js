import mongoose from "mongoose";
import commentModel from "./commentModel.js";
const Schema = mongoose.Schema;
const blogSchema = new Schema({
  ArticleTitle: { type: String, required: [true, "field required"] },
  ArticlePreview: { type: String, required: [true, "field required"] },
  ArticleImage: { type: String, required: [true, "field required"] },
  ArticleDescription: { type: String, required: [true, "field required"] },
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
