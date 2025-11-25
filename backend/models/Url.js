import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  shortId: { type: String, unique: true },
  originalUrl: { type: String, required: true },
  clicks: { type: Number, default: 0 },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.model("Url", urlSchema);
