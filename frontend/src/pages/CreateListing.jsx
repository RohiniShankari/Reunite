
import React, { useState } from "react";
import API from "../axios.js";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const [listing, setListing] = useState({
    title: "",
    description: "",
    location: "",
    type: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) return alert("Please select an image!");

    const formData = new FormData();
    formData.append("title", listing.title);
    formData.append("description", listing.description);
    formData.append("location", listing.location);
    formData.append("type", listing.type);
    formData.append("image", imageFile); // file input

    try {
      setLoading(true);
      await API.post("/listings", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Listing created!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error creating listing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Create Listing</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Title"
          value={listing.title}
          onChange={(e) => setListing({ ...listing, title: e.target.value })}
          required
        />
        <textarea
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Description"
          value={listing.description}
          onChange={(e) => setListing({ ...listing, description: e.target.value })}
          rows={4}
          required
        />
        <input
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Location"
          value={listing.location}
          onChange={(e) => setListing({ ...listing, location: e.target.value })}
          required
        />
        <select
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={listing.type}
          onChange={(e) => setListing({ ...listing, type: e.target.value })}
          required
        >
          <option value="">Select Type</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Uploading..." : "Create Listing"}
        </button>
      </form>
    </div>
  );
}
