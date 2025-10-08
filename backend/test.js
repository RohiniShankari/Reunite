import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config(); // Make sure this is before using process.env

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

console.log("Cloudinary configured:", cloudinary.config().cloud_name);

(async () => {
  try {
    console.log("Testing Cloudinary upload...");
    const res = await cloudinary.uploader.upload(
      "https://upload.wikimedia.org/wikipedia/commons/a/a3/June_odd-eyed-cat.jpg",
      { folder: "test" }
    );
    console.log("✅ Upload success:", res.secure_url);
  } catch (err) {
    console.error("❌ Upload failed:", err);
  }
})();
