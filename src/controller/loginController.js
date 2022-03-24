import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import { signToken } from "../middleware/auth.js";

const LoginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    const userFound = await userModel.findOne({ email: email });
    if (userFound) {
      bcrypt.compare(password, userFound.password, function (error, user) {
        if (error) {
          res.status(500).json({
            error: " Internal Server ",
          });
        }
        if (user) {
          const token = signToken({
            userId: userFound.id,
            role: userFound.role,
          });
          res.status(201).json({
            message: `welcome ${userFound.username}`,
            role: userFound.role,
            token,
            userId: userFound.id,
            username: userFound.username,
          });
        } else {
          res.status(401).json({
            error: `Incorrect Email or Password`,
          });
        }
      });
    } else {
      res.status(403).json({
        error: "User not Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Internal Server error",
      error,
    });
  }
};

export { LoginUser };
