import app from "./src/index.js";
import config from "./src/config.js";

const {port} = config;
app.listen(port || 4000, () => {
  console.log(`server is running.. 🔥🔥🔥 ${port}`);
});
