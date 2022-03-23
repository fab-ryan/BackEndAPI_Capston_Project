import subscriberModel from "../model/subscriberModel.js";
const postSubscriber = async (req, res) => {
  try {
    const subs = await subscriberModel.findOne({ email: req.body.email });
    if (subs) {
      res
        .status(400)
        .json({ error: `Email is already subscribed ${req.body.email}` });
    } else {
      const subscription = await subscriberModel.create(req.body);
      res.status(201).json({
        message: `subscribed well`,
        data: subscription,
      });
    }
  } catch (error) {
    res.status(403).json({ error: `Invalid ${error}` });
  }
};

const getAllSubscriber = async (req, res) => {
  try {
    const allSubscriber = await subscriberModel.find({});
    if (allSubscriber.length < 1) {
      res.status(406).json({ error: `No subscriber Listed` });
    } else {
      res.status(200).json({
        message: `successfully`,
        data: allSubscriber,
        count: allSubscriber.length,
      });
    }
  } catch (error) {
    res.status(400).json({ error: `bad Request` });
  }
};
const getOneSubscriber = async (req, res) => {
  const subId = req.params.id;
  if (!(await subscriberModel.findById(subId))) {
    res.status(400).json({
      error: `No Subscriber with this id ${subId}`,
    });
  } else {
    const Onesub = await subscriberModel.findById(subId);
    res.status(200).json({ message: `successfully`, data: Onesub });
  }
};
const deleteSubscriber = async (req, res) => {
  try {
    const subId = req.params.id;
    if (!(await subscriberModel.findById(subId))) {
      res
        .status(400)
        .json({ error: `Subscriber with this id ${subId} Not Found` });
    } else {
      await subscriberModel.findByIdAndDelete(subId);
      res.status(201).json({ message: `Subscribtion delete well` });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
export { postSubscriber, getAllSubscriber, deleteSubscriber, getOneSubscriber };
