import messageModel from "../model/messageModel.js";

const getAllMessage = async (req, res) => {
  try {
    const allMessages = await messageModel.find({});
    res.status(200).json({
      message: `Data retrived`,
      data: allMessages,
    });
  } catch (error) {
    console.log(error);
  }
};
const postAllMessage = async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const SavedData = await messageModel.create({
      name: name,
      email: email,
      message: message,
      date: Date.now(),
    });
    res.status(201).json({
      message: "Data saved successfully",
      data: SavedData,
    });
  } catch (error) {
    console.log(error);
  }
};
const getAMessage = async (req, res) => {
  const messageId = req.params.id;
  try {
    const Amessage = await messageModel.findById(messageId);
    res.status(200).json({
      message: "Single message",
      data: Amessage,
    });
  } catch (error) {
    console.log(error);
  }
};
const updateMessage = async (req, res) => {
  const messageId = req.params.id;
  const UpdateStatus = await messageModel.findByIdAndUpdate(messageId, {
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
    date: Date.now(),
  });
  res.status(200).json({
    message: `data has been update successfully`,
    data: UpdateStatus,
  });
};
const deleteMessage = async (req, res) => {
  const messageId = req.params.id;
  const DeleteResults = await messageModel.findByIdAndDelete(messageId);
  res.status(201).json({
    message: `Message has been Delete well`,
  });
};
export {
  getAllMessage,
  postAllMessage,
  getAMessage,
  updateMessage,
  deleteMessage,
};
