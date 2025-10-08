import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../axios.js";

export default function UpdateListing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState({
    title: "",
    description: "",
    location: "",
    type: "",
    imageUrl: "",
  });
  const [file, setFile] = useState(null); // for new image upload
  const [loading, setLoading] = useState(false);

  // Fetch existing listing data
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await API.get(`/listings/${id}`);
        setListing(res.data);
      } catch (err) {
        console.error("Error fetching listing:", err);
      }
    };
    fetchListing();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", listing.title);
      formData.append("description", listing.description);
      formData.append("location", listing.location);
      formData.append("type", listing.type);
      if (file) formData.append("image", file); // optional new image

      await API.put(`/listings/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Listing updated!");
      navigate(`/listing/${id}`);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error updating listing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Update Listing</h2>
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
          onChange={(e) => setFile(e.target.files[0])}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {listing.imageUrl && (
          <img
            src={listing.imageUrl}
            alt="Current"
            className="my-2 rounded"
            width={150}
          />
        )}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Updating..." : "Update Listing"}
        </button>
      </form>
    </div>
  );
}
