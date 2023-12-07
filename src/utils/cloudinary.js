import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

// * Method to upload file on cloudinary from local file system
const uploadOnCloudinary = async (localFilePath) => {
  try {
    // If the file does not exists then return null
    if (!localFilePath) {
      return null;
    }

    //If the file exists then upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    //file has been uploaded successfully
    console.log("File is uploaded on successfully", response.url);
    return response;
  } catch (error) {
    //Suppose If file is not uploaded then there is some problem
    // with the file so we better first unlink(remove the locally
    // saved file ) the file
    fs.unlinkSync(localFilePath);
  }
};

export { uploadOnCloudinary };
