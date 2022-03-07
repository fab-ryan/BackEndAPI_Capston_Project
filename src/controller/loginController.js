import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";

const LoginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    const userFound = await userModel.findOne({ email: email });
    if (userFound) {
      bcrypt.compare(password, userFound.password, function (error, user) {
        if (error) {
          console.log(error);
          res.json({
            message: "incorrect password",
          });
        }
        if (user) {
          res.json({
            message: `welcome ${userFound.username}`,
          });
        } else {
          res.json({
            error: `Incorrect Password`,
          });
        }
      });
    } else {
      res.status(403).json({
        error: "User not Found",
      });
    }
  } catch (error) {}
};

export { LoginUser };
