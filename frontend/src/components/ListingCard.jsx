
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ListingCard({ listing }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/listing/${listing._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="border border-gray-300 rounded-lg p-4 cursor-pointer hover:shadow-lg transition"
    >
      <h2 className="text-xl font-semibold mb-2">{listing.title}</h2>
      <p className="text-gray-600 mb-1">{listing.description}</p>
      <p className="text-gray-500 text-sm">Type: {listing.type}</p>
      <p className="text-gray-500 text-sm">Location: {listing.location}</p>
      {listing.imageUrl && (
        <img src={listing.imageUrl} alt={listing.title} className="mt-2 rounded" />
      )}
      <p className="text-gray-700 mt-2 text-sm">
        Posted by: {listing.ownerId?.username || "Anonymous"}
      </p>
    </div>
  );
}
