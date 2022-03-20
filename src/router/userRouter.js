import express from "express";
import {
  changePassword,
  deleteUser,
  getAllUser,
  getOneUser,
  postUser,
  updateUser,
  getUserInfo,
} from "../controller/userController.js";
import {
  userValidator,
  userUpdateValidate,
} from "../validator/userValidator.js";
import { verifyToken, IsAdmin } from "../middleware/is_auth.js";

const router = express.Router();

router.get("/user", verifyToken, IsAdmin, getAllUser);
router.post("/user", userValidator, postUser);
router.get("/user/:id", verifyToken, getOneUser);
router.patch("/user/:id", verifyToken, userUpdateValidate, updateUser);
router.delete("/user/:id", verifyToken, IsAdmin, deleteUser);
router.get("/userInfo", verifyToken, getUserInfo);

router.patch("/changepassword", verifyToken, changePassword);

export default router;
