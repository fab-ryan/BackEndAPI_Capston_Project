import messageModel from "../model/messageModel.js";

const getAllMessage = async (req, res) => {
  try {
    const allMessages = await messageModel.find({}).sort({
      createDate: -1,
    });
    if (allMessages.length < 1) {
      res.status(404).json({
        error: "Not Message Found",
        count: allMessages.length,
      });
    } else {
      res.status(200).json({
        message: `Data retrived`,
        count: allMessages.length,
        data: allMessages,
      });
    }
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
      message: "Message sent successfully",
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
    if (!Amessage)
      res.status(404).json({ error: `No Message With this id ${messageId}` });
    else
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

    if (!(await messageModel.findById(messageId)))
      res.status(404).json({ error: `No Message with this Id ${messageId}` });
    else {
      const UpdateStatus = await messageModel.findByIdAndUpdate(messageId, {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        date: Date.now(),
      });
      res.status(201).json({
        message: `data has been update successfully`,
        data: UpdateStatus,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Internal Server error",
    });
  }
};
const deleteMessage = async (req, res) => {
  try {
    const messageId = req.params.id;
    if (!(await messageModel.findById(messageId)))
      res.status(404).json({ error: `No Message with this Id ${messageId}` });
    else {
      const DeleteResults = await messageModel.findByIdAndDelete(messageId);
      res.status(201).json({
        message: `Message has been Delete well`,
      });
    }
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
