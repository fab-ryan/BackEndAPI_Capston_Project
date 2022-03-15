import express from "express";
import { deleteSubscriber, getAllSubscriber, getOneSubscriber, postSubscriber } from "../controller/subscribeController.js";
import { IsAdmin, verifyToken } from "../middleware/is_auth.js";
import sendUserEmail from "../middleware/subscribeMiddleware.js";

const router = express.Router();
router.post("/subscriber/",sendUserEmail, postSubscriber);
router.get("/subscriber",verifyToken,IsAdmin, getAllSubscriber);
router.get("/subscriber/:id",verifyToken,IsAdmin,getOneSubscriber);
router.patch("/subscriber/:id");
router.delete("/subscriber/:id",verifyToken, IsAdmin, deleteSubscriber);
export default router;
