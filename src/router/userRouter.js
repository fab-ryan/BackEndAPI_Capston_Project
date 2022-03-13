import express from "express";
import {
  deleteUser,
  getAllUser,
  getOneUser,
  postUser,
  updateUser,
} from "../controller/userController.js";
import userValidator from "../validator/userValidator.js";
import { verifyToken, IsAdmin } from "../middleware/is_auth.js";

const router = express.Router();

router.get("/user", verifyToken, IsAdmin, getAllUser);
router.post("/user", userValidator, postUser);
router.get("/user/:id", verifyToken, getOneUser);
router.patch("/user/:id", verifyToken, userValidator, updateUser);
router.delete("/user/:id", verifyToken, IsAdmin, deleteUser);

export default router;
