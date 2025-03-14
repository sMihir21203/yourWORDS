import {
  asyncHandler,
  ApiResponse,
  ApiError,
  uploadOnCloudinary,
} from "../utils/index.utils.js";
import { Post } from "../models/post.model.js";
import fs from "fs"

const createNewPost = asyncHandler(async (req, res, next) => {
  //get date -> req.body
  //postContent check
  //make slug
  //upload postImg in clouadinary
  //postImg cloudinaryUrl check
  //createNewPost
  //check if newPost created ?
  //res user postCreated

  const { postTitle, postCategory, postContent } = req.body;
  const imgLocalPath = req.file?.path;
  const userId = req.user?._id;
  // console.log(imgLocalPath)

  if (!imgLocalPath) {
    return next(new ApiError("404", "Post image is missing!"));
  }

  if (!postContent === "") {
    return next(new ApiError(400, "Add Some Content to show YourWORDS!"));
  }

  const slug = req.body.postTitle
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

  const existedPost = await Post.findOne({ slug });
  if (existedPost) {
    // console.log("Deleted File: ",imgLocalPath)
    if(imgLocalPath) fs.unlinkSync(imgLocalPath)
      
    return next(
      new ApiError(
        400,
        "This title is already taken kindly select another title"
      )
    );
  }
  const newPostImg = await uploadOnCloudinary(imgLocalPath);

  if (!newPostImg.url) {
    return next(
      new ApiError(
        400,
        "Something went wrong while uploading blogImage! please try again!"
      )
    );
  }

  const newPost = await Post.create({
    postTitle,
    postCategory,
    postImg: newPostImg.url,
    postContent,
    slug,
    userId,
  });

  if (!newPost) {
    return next(
      new ApiError(
        500,
        "Something went wrong while creating newPost! please try again!"
      )
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(201, { newPost }, "newPost created successfully!🎉"));
});

export { createNewPost };
