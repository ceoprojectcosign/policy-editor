import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  referralCode: { type: String },
});

export default mongoose.model("User", userSchema);
