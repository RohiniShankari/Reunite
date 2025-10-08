import mongoose from "mongoose";
 
const messageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: "Listing" },
  
  message: String,
  status: { type: String, default: "unread" }
}, { timestamps: true });

export default mongoose.model("Message", messageSchema);
