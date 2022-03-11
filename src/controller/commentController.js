import commentModel from "../model/commentModel.js";
import blogModel from "../model/blogModel.js";

const postAllComment = async (req, res) => {
  try {
    const blogId = req.params.id;
    const NewComment = await commentModel.create({
      fullname: req.body.fullname,
      email: req.body.email,
      comment: req.body.comment,
      blogPost: blogId,
    });
    const BlogPost = await blogModel.findById(blogId);
    BlogPost.comments.push(NewComment);
    await BlogPost.save(function (error) {
      res.status(201).json({
        message: "New comment",
        data: BlogPost,
      });
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

const getAllComment = async (req, res) => {
  try {
    const BlogId = req.params.id;
    const getComment = await blogModel.findById(BlogId).populate("comments");
    res.status(200).json({
      message: "All Comments",
      counte: getComment.comments.length,
      data: getComment.comments,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
const deleteComment = async (req, res) => {
  const blogId = req.params.blogId;
  const commentId = req.params.commentId;
  try {
    const deleteComment = await commentModel.findById(commentId);
    if (deleteComment) {
      const dele = await commentModel.findByIdAndDelete(commentId);
      const blog = await blogModel.findById(blogId);
      blog.comments.remove(commentId);
      await blog.save();
      res.status(200).json({
        message: "comment has been deleted well",
      });
    } else {
      res.status(400).json({
        error: `no comment found with this id ${commentId}`,
      });
    }
  } catch (error) {
    res.status(404).json({
      error: "No comment found",
    });
  }
};

export { postAllComment, getAllComment, deleteComment };
