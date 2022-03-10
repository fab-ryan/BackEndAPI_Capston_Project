import app from "./src/index.js";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT;
app.listen(port || 4000, () => {
  console.log(`server is running.. 🔥🔥🔥 ${port}`);
});
