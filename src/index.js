import express from "express";
import router from "./router/router.js";
import morgan from "morgan";
import dbconnect from "./database/databaseMongoose.js";

dbconnect;

const app = express();
app.use(morgan("dev"));
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(router);

export default app;
