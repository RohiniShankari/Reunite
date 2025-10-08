
import React, { useEffect, useState } from "react";
import API from "../axios.js";
import { FaTrashAlt } from "react-icons/fa";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await API.get("/messages");

        // Filter out cleared messages
        const visibleMessages = res.data.filter(msg => msg.status !== "cleared");

        // Sort messages: unread first, newest first
        const sortedMessages = visibleMessages.sort((a, b) => {
          if (a.status === "unread" && b.status === "read") return -1;
          if (a.status === "read" && b.status === "unread") return 1;
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        setMessages(sortedMessages);

        // Mark all unread messages as read
        await API.post("/messages/read");
        setMessages(prev => prev.map(msg => ({ ...msg, status: "read" })));
      } catch (err) {
        console.error(err);
        alert("Failed to fetch messages.");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleClear = async (id) => {
  if (!window.confirm("Are you sure you want to clear this message?")) return;

  try {
    await API.post(`/messages/clear/${id}`);
    setMessages((prev) => prev.filter((msg) => msg._id !== id));
  } catch (err) {
    console.error("Error clearing message:", err);
    alert("Failed to clear message");
  }
};




  if (loading) return <p className="text-center mt-10">Loading messages...</p>;
  if (messages.length === 0) return <p className="text-center mt-10">No messages yet.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Your Messages</h1>
      {messages.map((msg) => (
        <div
          key={msg._id}
          className={`border p-4 mb-4 rounded shadow flex justify-between items-center ${
            msg.status === "unread" ? "bg-yellow-100" : "bg-gray-100"
          }`}
        >
          <div>
            <p className="font-semibold">From: {msg.senderId.username}</p>
            <p className="font-semibold">To: {msg.receiverId.username}</p>
            <p className="text-gray-600">Regarding: {msg.listingId.title}</p>
            <p className="mt-2">{msg.message}</p>
          </div>

          <div className="flex items-center space-x-3">
            {msg.status === "unread" && (
              <span className="text-xs font-bold text-red-600">UNREAD</span>
            )}
            <FaTrashAlt
              onClick={() => handleClear(msg._id)}
              className="text-gray-600 hover:text-red-500 cursor-pointer"
              title="Clear message"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
