import Message from "../models/Message.js";

export const sendMessage = async (req, res) => {
  const { receiverId, listingId, message } = req.body;
  const msg = await Message.create({
    senderId: req.user._id, receiverId, listingId, message
  });
  res.json(msg);
};
export const getMessages = async (req, res) => {
  try {
        const msgs_received = await Message.find({ receiverId: req.user._id })
      .populate("senderId", "username")
      .populate("listingId", "title");

    const msgs_sent = await Message.find({ senderId: req.user._id })
      .populate("receiverId", "username")
      .populate("listingId", "title");

    const allMsgs = [...msgs_received, ...msgs_sent];

    // Remove duplicates by _id
    const msgs = allMsgs.filter(
      (msg, index, self) => index === self.findIndex((m) => m._id.toString() === msg._id.toString())
    );

    msgs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(msgs);

  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ message: "Error fetching messages" });
  }
};

// Mark all messages as read for logged-in user
export const markMessagesRead = async (req, res) => {
  console.log("Marking messages as read for user:", req.user._id);
  try {
    await Message.updateMany(
      { receiverId: req.user._id, status: "unread" },
      { $set: { status: "read" } }
    );
    res.json({ message: "Messages marked as read" });
  } catch (err) {
    res.status(500).json({ message: "Failed to mark messages as read" });
  }
};
export const clearMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await Message.findByIdAndUpdate(id, { status: "cleared" });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to clear message" });
  }
};
// export const clearMessage = async (req, res) => {
//   console.log("Clear message process");

//   const id = req.params.id;
//   console.log("Clearing message:", id);

//   const message = await Message.findById(id);
//   console.log(message);

//   // Problem is probably here:
//   if (req.user._id.equals(message.senderId)) {
//     // delete permanently
//     await Message.findByIdAndDelete(msg._id);  // <-- msg is undefined
//   } else {
//     // mark as cleared
//     message.status = "cleared";
//     await message.save();
//   }

//   res.json({ success: true });
// };
