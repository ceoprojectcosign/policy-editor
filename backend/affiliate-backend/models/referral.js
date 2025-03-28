import mongoose from "mongoose";

const referralSchema = new mongoose.Schema({
  referrer: { type: String, required: true },
  referredUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Referral", referralSchema);