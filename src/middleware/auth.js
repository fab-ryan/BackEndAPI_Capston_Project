import jwt from "jsonwebtoken";
import "dotenv/config";
const private_key = process.env.PRIVATE_KEY;

const signToken = (payload) => {
  return jwt.sign(payload, private_key, { expiresIn: 60 * 600 });
};

export { signToken };
