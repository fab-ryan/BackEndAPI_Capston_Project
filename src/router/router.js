import express from "express";

import {
  getAllMessage,
  postAllMessage,
  getAMessage,
  updateMessage,
  deleteMessage,
} from "../controller/MessageController.js";
import messageValidator from "../middleware/messageMiddleware.js";

const router = express.Router();
// Router For Question and Message
router.get("/messages", getAllMessage);
router.post("/messages/create", messageValidator, postAllMessage);
router.get("/singlemessage/:id", getAMessage);
router.put("/updatemessage/:id", messageValidator, updateMessage);
router.delete("/deletemessage/:id", deleteMessage);

// Router for Blog
router.get("/blog");
router.post("/blog/create");
router.get("/blog/:id");
router.put("/blogUpdate/:id");
router.delete("/blogDelete/:id");
export default router;
