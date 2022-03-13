import express from "express";
import commentValidator from "../validator/commentValidator.js";
import {
  deleteComment,
  getAllComment,
  postAllComment,
} from "../controller/commentController.js";
import { verifyToken, IsAdmin } from "../middleware/is_auth.js";

const router = express.Router();

router.post("/blog/:id/comment", verifyToken, commentValidator, postAllComment);
router.get("/blog/:id/comment", getAllComment);
router.delete(
  "/blog/:blogId/comment/:commentId",
  verifyToken,
  IsAdmin,
  deleteComment
);

export default router;
