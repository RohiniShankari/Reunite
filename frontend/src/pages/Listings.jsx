
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../axios.js";
import ListingCard from "../components/ListingCard.jsx";

export default function Listings() {
  const [listings, setListings] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const typeFilter = queryParams.get("type"); // "Lost", "Found" or null

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await API.get("/listings");
        let data = res.data;
        if (typeFilter) {
          data = data.filter(listing => listing.type === typeFilter);
        }
        setListings(data);
      } catch (err) {
        console.error("Error fetching listings:", err);
      }
    };
    fetchListings();
  }, [typeFilter]);

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white p-12 rounded-lg text-center mb-8 shadow-md">
        <h1 className="text-5xl font-bold mb-4">Welcome to Reunite</h1>
        <p className="text-xl mb-6">Lost it? Found it? Reunite it!</p>
        <button
          onClick={() => navigate("/create")}
          className="bg-white text-blue-600 px-6 py-3 rounded font-semibold hover:bg-gray-100 transition"
        >
          Create Listing
        </button>
      </div>

      {/* Listings */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        {typeFilter ? `${typeFilter} Items` : "Reported Items"}
      </h1>
      {listings.length === 0 ? (
        <p className="text-center text-gray-500">No listings found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
