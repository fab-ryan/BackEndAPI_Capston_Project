import express from "express";
import {
  getAllMessage,
  postAllMessage,
  getAMessage,
  updateMessage,
  deleteMessage,
} from "../controller/MessageController.js";
import messageValidator from "../validator/messageValidator.js";
import { verifyToken, IsAdmin } from "../middleware/is_auth.js";

const router = express.Router();

router.get("/messages", verifyToken, IsAdmin, getAllMessage);
router.post("/message", verifyToken, messageValidator, postAllMessage);
router.get("/message/:id", verifyToken, IsAdmin, getAMessage);
router.patch("/message/:id", verifyToken, messageValidator, updateMessage);
router.delete("/message/:id", verifyToken, IsAdmin, deleteMessage);

// Router for Blog
export default router;
