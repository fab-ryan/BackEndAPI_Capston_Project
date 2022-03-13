import jwt from "jsonwebtoken";
import "dotenv/config";
const private_key = process.env.PRIVATE_KEY;

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
