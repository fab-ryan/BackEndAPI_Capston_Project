import mongoose from "mongoose";
const Schema = mongoose.Schema;
const blogSchema = new Schema({
  ArticleTitle: String,
  ArticlePreview: String,
  ArticleImage: {
    type: Buffer,
  },
  ArticleDescription: String,
});

export default new mongoose.model("blogSchema", blogSchema);
