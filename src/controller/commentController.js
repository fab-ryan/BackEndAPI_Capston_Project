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
    console.log(error);
  }
};

const getAllComment = async (req, res) => {
  try {
    const BlogId = req.params.id;
    const getComment = await blogModel.findById(BlogId).populate("comments");
    res.status(200).json({
      message: "All Comments",
      data: getComment.comments,
    });
  } catch (error) {
    console.log(error);
  }
};
export { postAllComment, getAllComment };
