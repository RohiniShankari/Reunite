
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../axios.js";

export default function ListingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);

  //const loggedInUserId = localStorage.getItem("userId"); // make sure you save userId in localStorage on login

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

  const notifyOwner = async () => {
    if (!localStorage.getItem("token")) {
      alert("You must be logged in to send a notification.");
      return;
    }

    const msgText = prompt("Enter your message to the owner:");
    if (!msgText) return;

    try {
      setLoading(true);
      await API.post(
        "/messages",
        {
          senderId: loggedInUserId,
          receiverId: listing.ownerId._id,
          listingId: listing._id,
          message: msgText,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Message sent to the owner!");
    } catch (err) {
      console.error(err);
      alert("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  const deleteListing = async () => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;

    try {
      setLoading(true);
      await API.delete(`/listings/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Listing deleted successfully!");
      navigate("/"); // redirect to home after deletion
    } catch (err) {
      console.error("Failed to delete listing:", err);
      alert("Failed to delete listing.");
    } finally {
      setLoading(false);
    }
  };
  

  if (!listing) return <p className="text-center mt-10">Loading...</p>;
const loggedInUserId = localStorage.getItem("userId");
const isOwner = loggedInUserId === listing.ownerId?._id.toString();
  console.log("Is owner:", isOwner);
  console.log("Logged in user ID:", loggedInUserId);
  console.log("Listing owner ID:", listing.ownerId?._id.toString());
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4">{listing.title}</h1>
      <p className="text-gray-700 mb-2">{listing.description}</p>
      <p className="text-gray-500 mb-1">Type: {listing.type}</p>
      <p className="text-gray-500 mb-1">Location: {listing.location}</p>
      {listing.imageUrl && (
        <img src={listing.imageUrl} alt={listing.title} className="my-4 rounded" />
      )}
      <p className="text-gray-700 mt-2">Posted by: {listing.ownerId?.username || "Anonymous"}</p>

      <div className="mt-4 flex space-x-3">
         {!isOwner && (
        <button
          onClick={notifyOwner}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {loading ? "Sending..." : "Notify Owner"}
        </button>
          )}
        {isOwner && (
          <button
            onClick={deleteListing}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            {loading ? "Deleting..." : "Delete Listing"}
          </button>

          
        )}
        {isOwner && (
            <button
              onClick={() => navigate(`/listing/${id}/edit`)}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Edit Listing
            </button>
          )}

      </div>
    </div>
  );
}

