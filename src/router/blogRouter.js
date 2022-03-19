import express from "express";
import {
  postAllBlog,
  getAllBlog,
  getOneBlog,
  updateBlog,
  deleteBlog,
  updateBlogWithOutImg,
} from "../controller/blogController.js";
import { blogValidate } from "../validator/blogValidator.js";
import { verifyToken, IsAdmin } from "../middleware/is_auth.js";
import multer from "multer";
const router = express.Router();
const storage = multer.diskStorage({});
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("invalid image file!", false);
  }
};
const upload = multer({ storage, fileFilter });

router.get("/blog", getAllBlog);
router.post(
  "/blog",
  verifyToken,
  IsAdmin,
  upload.single("ArticleImage"),
  blogValidate,

  postAllBlog
);

router.get("/blog/:id", getOneBlog);
router.patch(
  "/blogImage/:id",
  verifyToken,
  IsAdmin,
  upload.single("ArticleImage"),
  blogValidate,
  updateBlog
);
router.patch(
  "/blog/:id",
  verifyToken,
  IsAdmin,
  blogValidate,
  updateBlogWithOutImg
);
router.delete("/blog/:id", verifyToken, IsAdmin, deleteBlog);

export default router;
