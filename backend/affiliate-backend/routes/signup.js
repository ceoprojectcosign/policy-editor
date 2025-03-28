import express from "express";
import User from "../models/user.js";
import Referral from "../models/referral.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, referralCode } = req.body;

    const user = new User({ email, referralCode });
    await user.save();

    if (referralCode) {
      await Referral.create({ referrer: referralCode, referredUser: user._id });
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Signup failed" });
  }
});

export default router;