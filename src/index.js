import express from "express";
import router from "./router/router.js";
import dbconnect from "./database/databaseMongoose.js";

dbconnect;

const app = express();
app.use(express.json());
app.use(router);

export default app;
