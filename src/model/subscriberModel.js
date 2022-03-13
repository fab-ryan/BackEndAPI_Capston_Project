import mongoose from "mongoose";
const Schema = mongoose.Schema;
const subscriberSchema = new Schema({
  email: {
    type: String,
    trim: true,
  },
  create_at: { type: Date, default: Date.now() },
});

export default new mongoose.model('subscriber',subscriberSchema);