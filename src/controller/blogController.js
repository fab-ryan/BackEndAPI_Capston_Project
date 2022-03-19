import blogeModel from "../model/blogModel.js";
import commentModel from "../model/commentModel.js";
import slug from "slug";
import userModel from "../model/userModel.js";
import { fileUpload } from "../middleware/mutler.js";
//  this is the comment
const postAllBlog = async (req, res) => {
  try {
    const { ArticleTitle, ArticlePreview, ArticleDescription } = req.body;
    if (await blogeModel.findOne({ slug: slug(ArticleTitle) }))
      res.status(400).json({
        error: `This Blog Exist ${ArticleTitle}`,
      });
    else {
      const user = await userModel.findById(req.user.userId);
      req.body.ArticleImage = await fileUpload(req);
      const blogs = await blogeModel.create({
        ArticleTitle: ArticleTitle,
        ArticlePreview: ArticlePreview,
        ArticleImage: req.body.ArticleImage,
        ArticleDescription: ArticleDescription,
        slug: slug(ArticleTitle),
        author: user.username,
      });
      res.status(201).json({
        message: "Blog Has been saved succefull",
        data: blogs,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: `Internal ${error}`,
    });
  }
};
const getAllBlog = async (req, res) => {
  try {
    const Allblogs = await blogeModel.find({}).sort({
      created_at: -1,
    });
    if (Allblogs.length < 1) {
      res.status(404).json({
        error: "No Blog Found",
        counts: Allblogs.length,
      });
    } else {
      res.status(200).json({
        message: "all Blogs ",
        counts: Allblogs.length,
        data: Allblogs,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Internal Server error",
    });
  }
};

const getOneBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const OneBlog = await blogeModel.findById(blogId);
    if (!OneBlog)
      return res.status(408).json({ error: `blog with this id ${blogId}` });
    res.status(200).json({
      message: "one Blog",
      data: OneBlog,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server error",
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    if (!(await blogeModel.findById(blogId)))
      return res
        .status(404)
        .json({ error: `no Blog found with this id ${blogId}` });
    req.body.ArticleImage = await fileUpload(req);
    const UpdateBlog = await blogeModel.findByIdAndUpdate(blogId, req.body);
    res.status(201).json({
      message: "Blog Update",
      data: UpdateBlog,
    });
  } catch (error) {
    res.status(500).json({
      error: `Internal Server error ${error}`,
    });
  }
};
const updateBlogWithOutImg = async (req, res) => {
  try {
    const blogId = req.params.id;
    if (!(await blogeModel.findById(blogId)))
      return res
        .status(404)
        .json({ error: `no Blog found with this id ${blogId}` });
    const UpdateBlog = await blogeModel.findByIdAndUpdate(blogId, req.body);
    res.status(201).json({
      message: "Blog Update",
      data: UpdateBlog,
    });
  } catch (error) {
    res.status(500).json({
      error: `Internal Server error ${error}`,
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await blogeModel.findById(blogId);
    if (blog) {
      const DeleteBlog = await blogeModel.findByIdAndDelete(blogId);
      const commentdel = await commentModel.deleteMany({ blogPost: blogId });
      res.status(200).json({
        message: "Blog Delete",
      });
    }
    res.status(404).json({ error: "Blog Id not found" });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server error",
    });
  }
};

export {
  postAllBlog,
  getAllBlog,
  getOneBlog,
  updateBlog,
  deleteBlog,
  updateBlogWithOutImg,
};
