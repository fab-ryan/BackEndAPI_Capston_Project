import express from "express";
import router from "./router/router.js";
import morgan from "morgan";
import dbconnect from "./database/databaseMongoose.js";

const app = express();
dbconnect;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));
app.use(router);

export default app;
