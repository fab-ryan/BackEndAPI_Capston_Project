import bcrypt from "bcrypt";
import userModel from "../model/userModel.js";
import userSchema from "../model/userModel.js";
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
      });

      res.status(201).json({
        message: "user Created successfully",
        data: NewUser,
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
      error: "Internal Server error",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    if (!(await userModel.findById(userId)))
      return res
        .status(409)
        .json({ error: `user with this not found ${userId}` });
    const UpdateUser = await userSchema.findByIdAndUpdate(userId, {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      username: req.body.username,
      password: hashPassword,
    });
    res.status(201).json({
      message: "User Updated well",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
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

export { postUser, getAllUser, getOneUser, updateUser, deleteUser };
