import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if(!localFilePath) return null
    //upload file on cloudinary
    const res = await cloudinary.uploader.upload(localFilePath,{
      resource_type:"auto"
    })
    //successfully upload on cloudinary
    console.log("file is uploaded in cloudinary", res.url)
    console.log("cloudinary res: ", res);
    return res
  } catch (error) {
    fs.unlinkSync(localFilePath) // remove locally saved temp file if uploading is fail
    return null
  }
}