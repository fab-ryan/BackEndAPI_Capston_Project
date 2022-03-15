import express from "express";
import router from "./router/router.js";
import morgan from "morgan";
import dbconnect from "./database/databaseMongoose.js";
import swaggerUi from "swagger-ui-express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerDoc = require("../swagger.json");
import cors from "cors";
const app = express();
dbconnect;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cors());
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDoc, { extended: true })
);
app.use(morgan("dev"));
app.use(router);
export default app;
