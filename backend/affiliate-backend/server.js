import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import signupRoutes from "./routes/signup.js";
import referralRoutes from "./routes/referral.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/signup", signupRoutes);
app.use("/api/referrals", referralRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("🚀 MongoDB connected");
    app.listen(process.env.PORT, () => console.log(`🌐 Server running on port ${process.env.PORT}`));
  })
  .catch(err => console.error(err));