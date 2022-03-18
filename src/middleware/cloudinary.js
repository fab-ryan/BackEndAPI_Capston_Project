import cloudinary from "cloudinary";
import config from "../config.js";
const { cloudinary_api_name, cloudinary_api_key, cloudinary_api_secret } =
  config;
cloudinary.config({
  cloud_name: cloudinary_api_name,
  api_key: cloudinary_api_key,
  api_secret: cloudinary_api_secret,
});

export default cloudinary;
