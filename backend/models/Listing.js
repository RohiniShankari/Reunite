import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
  title: String,
  description: String,
  type: { type: String, enum: ["lost", "found"], required: true },
  location: String,
  imageUrl: String,
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export default mongoose.model("Listing", listingSchema);
