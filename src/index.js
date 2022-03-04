import express from "express";
import router from "./router/router.js";
import dbconnect from "./database/databaseMongoose.js";
const app = express();
dbconnect;
app.use( express.json() );
app.use( router );

app.listen( 3000, () => {
  console.log( `Server is running on Port` );
} );