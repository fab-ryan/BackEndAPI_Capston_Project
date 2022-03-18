import jwt from "jsonwebtoken";
import config from "../config.js";
const { secret } = config;

const signToken = (payload) => {
  try {
    return jwt.sign(payload, secret, { expiresIn: "1d" });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export { signToken };
