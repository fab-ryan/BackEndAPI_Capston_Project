import mongoose from "mongoose";

const Schema = mongoose.Schema;
const blogSchema = new Schema({
  ArticleTitle: { type: String },
  ArticlePreview: { type: String },
  ArticleImage: { type: String, contentType: String },
  ArticleDescription: { type: String },
  slug: { type: String, required: true },
  author: { type: String, required: true },
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
