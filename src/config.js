import dontenv from "dotenv";
dontenv.config();
const config = {
  development: {
    port: process.env.PORT,
    db: process.env.DEV_DB_URL,
    secret: process.env.PRIVATE_KEY,
    mail: process.env.API_GRID_API,
  },
  test: {
    port: process.env.TEST_PORT,
    db: process.env.TEST_URL_TEST,
    secret: process.env.PRIVATE_KEY,
    mail: process.env.API_GRID_API,
  },
  production: {
    port: process.env.PROD_PORT,
    db: process.env.PROD_DB_URL,
    secret: process.env.PRIVATE_KEY,
    mail: process.env.API_GRID_API,
  },
};

const currentConfig = config[process.env.NODE_ENV];
export default currentConfig;
