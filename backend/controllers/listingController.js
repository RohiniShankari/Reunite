import Listing from "../models/Listing.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier"; // ✅ add this dependency

export const createListing = async (req, res) => {
  try {
    const { title, description, location, type } = req.body;

    if (!title || !description || !location || !type) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let imageUrl = "";

    if (req.file) {
      // Upload image from buffer using stream
      const streamUpload = (buffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "listings" },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          streamifier.createReadStream(buffer).pipe(stream);
        });
      };

      const result = await streamUpload(req.file.buffer);
      imageUrl = result.secure_url;
    }

    const newListing = new Listing({
      title,
      description,
      location,
      type,
      imageUrl,
      ownerId: req.user.id,
    });

    const savedListing = await newListing.save();
    res.status(201).json(savedListing);
  } catch (err) {
    console.error("Error creating listing:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// export const createListing = async (req, res) => {
//   const { title, description, type, location, imageUrl } = req.body;
//   const listing = await Listing.create({
//     title, description, type, location, imageUrl, ownerId: req.user._id
//   });
//   res.json(listing);
// };


export const getListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id).populate("ownerId", "username");
  if (!listing) {
    return res.status(404).json({ message: "Listing not found" });
  }
  res.json(listing);

};
export const getListings = async (req, res) => {
  const listings = await Listing.find().populate("ownerId", "username");
  res.json(listings);
};
export const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    // Check if logged-in user is the owner
    if (listing.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to delete this listing" });
    }

    await listing.deleteOne();
    res.json({ message: "Listing deleted successfully" });
  } catch (err) {
    console.error("Error deleting listing:", err);
    res.status(500).json({ message: "Server error" });
  }
};