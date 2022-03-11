import blogeModel from "../model/blogModel.js";
import commentModel from "../model/commentModel.js";

//  this is the comment
const postAllBlog = async (req, res) => {
  try {
    const blogs = await blogeModel.create(req.body);
    res.status(201).json({
      message: "Blog Has been saved succefull",
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server error",
    });
  }
};
const getAllBlog = async (req, res) => {
  try {
    const Allblogs = await blogeModel.find({});
    res.status(200).json({
      message: "all Blogs ",
      counts: Allblogs.length,
      data: Allblogs,
    });
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
    const UpdateBlog = await blogeModel.findByIdAndUpdate(blogId, req.body);
    res.status(201).json({
      message: "Blog Update",
      data: UpdateBlog,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server error",
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

export { postAllBlog, getAllBlog, getOneBlog, updateBlog, deleteBlog };
