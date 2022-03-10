import express from "express";
import {
  getAllMessage,
  postAllMessage,
  getAMessage,
  updateMessage,
  deleteMessage,
} from "../controller/MessageController.js";
import messageValidator from "../validator/messageValidator.js";
import { blogValidate } from "../validator/blogValidator.js";
import {
  postAllBlog,
  getAllBlog,
  getOneBlog,
  updateBlog,
  deleteBlog,
} from "../controller/BlogController.js";
import userValidator from "../validator/userValidator.js";
import commentValidator from "../Validator/commentValidator.js";
import {
  getAllComment,
  postAllComment,
} from "../controller/commentController.js";
import {
  deleteUser,
  getAllUser,
  getOneUser,
  postUser,
  updateUser,
} from "../controller/userController.js";
import { LoginUser } from "../controller/loginController.js";
import { verifyToken, IsAdmin } from "../middleware/is_auth.js";
import { logout } from "../controller/logoutController.js";

const router = express.Router();
// Router For Question and Message
router.get("/messages", verifyToken, IsAdmin, getAllMessage);
router.post("/messages/create", messageValidator, postAllMessage);
router.get("/singlemessage/:id", getAMessage);
router.patch("/updatemessage/:id", messageValidator, updateMessage);
router.delete("/deletemessage/:id", verifyToken, IsAdmin, deleteMessage);

// Router for Blog
router.get("/blog", getAllBlog);
router.post("/blog", verifyToken, IsAdmin, blogValidate, postAllBlog);
router.get("/blog/:id", getOneBlog);
router.patch("/blog/:id", verifyToken, IsAdmin, blogValidate, updateBlog);
router.delete("/blog/:id", verifyToken, IsAdmin, deleteBlog);

// Router for Comment on blog

router.post("/blog/:id/comment", verifyToken, commentValidator, postAllComment);
router.get("/blog/:id/comment", getAllComment);

// Router for User
router.get("/user", verifyToken, IsAdmin, getAllUser);
router.post("/user", userValidator, postUser);
router.get("/user/:id", verifyToken, IsAdmin, getOneUser);
router.patch("/user/:id", verifyToken, IsAdmin, userValidator, updateUser);
router.delete("/user/:id", verifyToken, IsAdmin, deleteUser);

//Router for login

router.post("/login", LoginUser);
router.post("/logout", logout);

export default router;
