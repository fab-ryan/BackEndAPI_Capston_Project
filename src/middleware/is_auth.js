import jwt from "jsonwebtoken";
import "dotenv/config";
const private_key = process.env.PRIVATE_KEY;
let token;
const verifyToken = (req, res, next) => {
  try {
    token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "you need to login first" });
    }
    try {
      const user = jwt.verify(token, private_key);
      req.user = user;
      next();
    } catch (error) {
      res.status(400).json({ error: "Invalid token Login Again" });
    }
  } catch (error) {
    res.status(400).json({ error: "No token has provided" });
  }
};

const IsAdmin = (req, res, next) => {
  const user = req.user;
  if (user.role == "admin") return next();
  return res.status(401).json({
    status: "fail",
    message: "You don't have permission to perform this action",
  });
};

export { verifyToken, IsAdmin };
