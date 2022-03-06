import express from "express";
import {
  getAllMessage,
  postAllMessage,
  getAMessage,
  updateMessage,
  deleteMessage,
} from "../controller/MessageController.js";
import messageValidator from "../middleware/messageMiddleware.js";
import { blogValidate } from "../middleware/blogMiddleware.js";
import {
  postAllBlog,
  getAllBlog,
  getOneBlog,
  updateBlog,
  deleteBlog,
} from "../controller/BlogController.js";
import userValidator from "../middleware/userMiddleware.js";

import {
  deleteUser,
  getAllUser,
  getOneUser,
  postUser,
  updateUser,
} from "../controller/userController.js";

const router = express.Router();
// Router For Question and Message
router.get("/messages", getAllMessage);
router.post("/messages/create", messageValidator, postAllMessage);
router.get("/singlemessage/:id", getAMessage);
router.patch("/updatemessage/:id", messageValidator, updateMessage);
router.delete("/deletemessage/:id", deleteMessage);

// Router for Blog
router.get("/blog", getAllBlog);
router.post("/blog", blogValidate, postAllBlog);
router.get("/blog/:id", getOneBlog);
router.patch("/blog/:id", blogValidate, updateBlog);
router.delete("/blog/:id", deleteBlog);

// Router for User
router.get("/user", getAllUser);
router.post("/user", userValidator, postUser);
router.get("/user/:id", getOneUser);
router.patch("/user/:id", userValidator, updateUser);
router.delete("/user/:id", deleteUser);
export default router;
