import mongoose from "mongoose";
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
});

export default new mongoose.model("blogSchema", blogSchema);
