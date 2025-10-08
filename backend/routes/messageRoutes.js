import express from "express";
import { sendMessage, getMessages, markMessagesRead,clearMessage} from "../controllers/messageController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/", protect, sendMessage);
router.get("/", protect, getMessages);
router.post("/clear/:id", clearMessage);
router.post("/read", protect, markMessagesRead); // new endpoint

export default router;
