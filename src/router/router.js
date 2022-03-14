import express from "express";
import userRouter from "./userRouter.js";
import loginRouter from "./loginRouter.js";
import commentRouter from "./commentRouter.js";
import blogRouter from "./blogRouter.js";
import messageRouter from "./messageRouter.js";
import subscribeRouter from './subscriberRouter.js'
const routers = express();
routers.use("/api/v1/", userRouter);
routers.use("/api/v1/", loginRouter);
routers.use("/api/v1", commentRouter);
routers.use("/api/v1/", blogRouter);
routers.use('/api/v1',subscribeRouter)
routers.use("/api/v1/", messageRouter);
export default routers;
