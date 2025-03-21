import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) return null;

  try {
    const res = await cloudinary.uploader.upload(localFilePath);
    //delete localImg after upload
    if (res.url) {
      fs.unlinkSync(localFilePath);
      return res;
    }
  } catch (error) {
    console.error("cloudinary upload err: ", error.message);
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    return null;
  }
};

const deleteFromCloudinary = async (imgUrl) => {
  if (!imgUrl) return null;

  try {
    const publicId = imgUrl.split("/").pop().split(".")[0];
    // console.log("imgUrl: ", imgUrl);
    // console.log("publicId: ", publicId);

    const res = await cloudinary.uploader.destroy(publicId);
    // console.log("deletedImg: ", JSON.stringify(res));
    return res.result === "ok";
  } catch (error) {
    console.error("cloudinary deletion err: ", error.message);
    return false;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
