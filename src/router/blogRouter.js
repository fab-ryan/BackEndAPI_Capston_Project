import express from "express";
import {
  postAllBlog,
  getAllBlog,
  getOneBlog,
  updateBlog,
  deleteBlog,
} from "../controller/blogController.js";
import { blogValidate } from "../validator/blogValidator.js";
import { verifyToken, IsAdmin } from "../middleware/is_auth.js";
import multer from "multer";

const router = express.Router();

// const storage = multer.diskStorage({});
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb("invalid image file!", false);
//   }
// };
// const uploads = multer({ storage, fileFilter });

const upload = multer({ dest: "uploads/" });

router.get("/blog", getAllBlog);
router.post(
  "/blog",
  verifyToken,
  IsAdmin,
  blogValidate,
  upload.single("image"),
  postAllBlog
);

router.get("/blog/:id", getOneBlog);
router.patch("/blog/:id", verifyToken, IsAdmin, blogValidate, updateBlog);
router.delete("/blog/:id", verifyToken, IsAdmin, deleteBlog);

export default router;
