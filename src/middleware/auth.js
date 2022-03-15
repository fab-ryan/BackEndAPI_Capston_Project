import jwt from "jsonwebtoken";
import config from "../config.js";
const private_key = config.secret;

const signToken = (payload) => {
  try {
    return jwt.sign(payload, private_key, { expiresIn: "1d" });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export { signToken };
