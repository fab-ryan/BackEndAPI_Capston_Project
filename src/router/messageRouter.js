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
router.post("/messages", verifyToken, messageValidator, postAllMessage);
router.get("/singlemessage/:id", verifyToken, IsAdmin, getAMessage);
router.patch(
  "/updatemessage/:id",
  verifyToken,
  messageValidator,
  updateMessage
);
router.delete("/deletemessage/:id", verifyToken, IsAdmin, deleteMessage);

// Router for Blog
export default router;
