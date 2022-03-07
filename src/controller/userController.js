import bcrypt from "bcrypt";
import userSchema from "../model/userModel.js";
const postUser = async (req, res) => {
  try {
    const { email } = req.body;
    const userexist = await userSchema.find({ email: email.toLowerCase() });
    if (userexist.length) {
      res.json({
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
        message: "successfully",
        data: NewUser,
      });
    }
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
};

const getOneUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const OneUser = await userSchema.findById(userId);
    res.status(200).json({
      message: "User retrevied well",
      data: OneUser,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const UpdateUser = await userSchema.findByIdAndUpdate(userId, req.body);
    res.status(201).json({
      message: "User Updated well",
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const DeleteUser = await userSchema.findByIdAndDelete(userId);
    res.status(200).json({
      message: "User Deleted succefully",
    });
  } catch (error) {
    console.log(error);
  }
};

export { postUser, getAllUser, getOneUser, updateUser, deleteUser };
