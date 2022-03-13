import messageModel from "../model/messageModel.js";

const getAllMessage = async (req, res) => {
  try {
    const allMessages = await messageModel.find({});
    res.status(200).json({
      message: `Data retrived`,
      count: allMessages.length,
      data: allMessages,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server error",
    });
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
    res.status(500).json({
      error: "Internal Server error",
    });
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
    res.status(500).json({
      error: "Internal Server error",
    });
  }
};
const updateMessage = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      error: "Internal Server error",
    });
  }
};
const deleteMessage = async (req, res) => {
  try {
    const messageId = req.params.id;
    const DeleteResults = await messageModel.findByIdAndDelete(messageId);
    res.status(201).json({
      message: `Message has been Delete well`,
    });
  } catch (err) {
    res.status(500).json({
      error: "Internal Server error",
    });
  }
};
export {
  getAllMessage,
  postAllMessage,
  getAMessage,
  updateMessage,
  deleteMessage,
};
