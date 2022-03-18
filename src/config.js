import dontenv from "dotenv";
dontenv.config();
const config = {
  development: {
    port: process.env.DEV_PORT,
    db: process.env.DEV_DB_URL,
    secret: process.env.PRIVATE_KEY,
    mail: process.env.API_SEND_GRID_API,
    cloudinary_api_name: process.env.CLOUDINARY_USER_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  },
  test: {
    port: process.env.TEST_PORT,
    db: process.env.TEST_DB_URL,
    secret: process.env.PRIVATE_KEY,
    mail: process.env.API_SEND_GRID_API,
    cloudinary_api_name: process.env.CLOUDINARY_USER_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  },
  production: {
    port: process.env.PORT,
    db: process.env.PROD_DB_URL,
    secret: process.env.PRIVATE_KEY,
    mail: process.env.API_SEND_GRID_API,
    cloudinary_api_name: process.env.CLOUDINARY_USER_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  },
};

const currentConfig = config[process.env.NODE_ENV];
export default currentConfig;
