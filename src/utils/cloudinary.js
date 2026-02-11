import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

// Don't configure here at module level
// Configure inside the function instead

const uploadOnCloudinary = async (localFilePath) => {
    try {
        // Configure Cloudinary here, inside the function
        cloudinary.config({ 
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
            api_key: process.env.CLOUDINARY_API_KEY, 
            api_secret: process.env.CLOUDINARY_API_SECRET 
        });

        if (!localFilePath) {
            console.log("❌ No file path provided");
            return null;
        }

        console.log("📁 File to upload:", localFilePath);
        console.log("✅ File exists:", fs.existsSync(localFilePath));
        console.log("🔧 Cloudinary config:");
        console.log("   Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
        console.log("   API Key:", process.env.CLOUDINARY_API_KEY);
        console.log("   API Secret:", process.env.CLOUDINARY_API_SECRET ? "SET" : "NOT SET");

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        console.log("✅ Upload successful:", response.url);
        fs.unlinkSync(localFilePath);
        return response;

    } catch (error) {
        console.error("=== CLOUDINARY UPLOAD ERROR ===");
        console.error("Error message:", error.message);
        console.error("Error name:", error.name);
        console.error("Error http_code:", error.http_code);
        console.error("Full error:", error);
        console.error("==============================");
        
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return null;
    }
};

const deleteFromCloudinary = async (publicId) => {
    try {
        cloudinary.config({ 
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
            api_key: process.env.CLOUDINARY_API_KEY, 
            api_secret: process.env.CLOUDINARY_API_SECRET 
        });

        if (!publicId) return null;
        const response = await cloudinary.uploader.destroy(publicId);
        return response;
    } catch (error) {
        console.error("Error deleting from cloudinary:", error);
        return null;
    }
};

export { uploadOnCloudinary, deleteFromCloudinary };