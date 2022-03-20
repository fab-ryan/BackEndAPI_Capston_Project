import bcrypt from "bcrypt";
import userSchema from "../model/userModel.js";
import { signToken } from "../middleware/auth.js";

const postUser = async (req, res) => {
  try {
    const { email } = req.body;
    const userexist = await userSchema.find({ email: email.toLowerCase() });
    if (userexist.length) {
      res.status(400).json({
        error: `User with this email ${email} is exists`,
      });
    } else {
      const hashPassword = bcrypt.hashSync(req.body.password, 10);
      const NewUser = await userSchema.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        username: req.body.username,
        password: hashPassword,
        role: req.body.role,
      });
      const token = signToken({ userId: NewUser.id, role: NewUser.role });
      res.status(201).json({
        message: "user Created successfully",
        data: NewUser,
        token,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const allUser = await userSchema.find();
    res.status(200).json({
      message: "All user Registered",
      count: allUser.length,
      data: allUser,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server error",
    });
  }
};

const getOneUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const OneUser = await userSchema.findById(userId);
    if (!OneUser)
      return res.status(404).json({ error: `no user with this Id ${userId}` });
    res.status(200).json({
      message: "User retrevied well",
      data: OneUser,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server  error",
    });
  }
};

const getUserInfo = async (req, res) => {
  const userId = req.user.userId;
  try {
    const OneUser = await userSchema.findOne({ _id: userId });
    if (!OneUser)
      return res.status(404).json({ error: `no user with this Id ${userId}` });
    res.status(200).json({
      message: "User retrevied well",
      data: OneUser,
    });
  } catch (error) {
    res.status(500).json({
      error: " hhhh Internal Server error",
    });
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!(await userSchema.findById(userId)))
      return res
        .status(409)
        .json({ error: `user with this not found ${userId}` });
    const UpdateUser = await userSchema.findByIdAndUpdate(userId, req.body);
    res.status(201).json({
      message: "User Updated well",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userFound = await userSchema.findById(req.user.userId);
  if (userFound) {
    const current = bcrypt.compareSync(currentPassword, userFound.password);
    if (current == true) {
      const hashPassword = bcrypt.hashSync(req.body.newPassword, 10);
      const UpdateUser = await userSchema.findByIdAndUpdate(req.user.userId, {
        password: hashPassword,
      });
      const token = signToken({ userId: userFound.id, role: userFound.role });
      res.status(201).json({
        message: `Password Changed successfuly`,
        token,
      });
    } else {
      res.status(409).json({ error: `Incorrect Current Password` });
    }
  }
};
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!(await userSchema.findById(userId)))
      return res.status(404).json({ error: `user not found ${userId}` });
    const DeleteUser = await userSchema.findByIdAndDelete(userId);
    res.status(200).json({
      message: "User Deleted succefully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server error",
    });
  }
};

export {
  postUser,
  getAllUser,
  getOneUser,
  updateUser,
  deleteUser,
  changePassword,
  getUserInfo,
};
