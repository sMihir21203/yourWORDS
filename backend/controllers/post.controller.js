import {
  asyncHandler,
  ApiResponse,
  ApiError,
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/index.utils.js";
import { Post } from "../models/post.model.js";
import fs from "fs";

const createNewPost = asyncHandler(async (req, res, next) => {
  //get data -> req.body
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
    fs.unlinkSync(imgLocalPath);
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

const updatePost = asyncHandler(async (req, res, next) => {
  const { postTitle, postCategory, postContent } = req.body;
  const postImg = req.file?.path;
  const userId = req.user?._id.toString();
  const reqUserId = req.params.userId.toString();
  const slug = req.params.slug ? req.params.slug : null;

  if (userId !== reqUserId) {
    return next(new ApiError(403, "You Are Not Allowed to update this post"));
  }

  try {
    const postToUpdate = await Post.findOne({ slug });
    if (!postToUpdate) {
      return next(new ApiError(404, "Post Not Found"));
    }

    let updatedFields = {};
    let messageKeys = [];

    //handling img update if newImg
    if (postImg) {
      if (postToUpdate.postImg) {
        await deleteFromCloudinary(postToUpdate.postImg);
      }

      const newPostImg = await uploadOnCloudinary(postImg);
      if (!newPostImg.url) {
        return next(new ApiError(400, "Error uploading image to Cloudinary"));
      }
      updatedFields.postImg = newPostImg.url;
      messageKeys.push("Image");
    }

    if (postTitle && postTitle !== postToUpdate.postTitle) {
      updatedFields.postTitle = postTitle;
      messageKeys.push("Title");
    }
    if (postCategory && postCategory !== postToUpdate.postCategory) {
      updatedFields.postCategory = postCategory;
      messageKeys.push("Category");
    }
    if (postContent && postContent !== postToUpdate.postContent) {
      updatedFields.postContent = postContent;
      messageKeys.push("Content");
    }

    if (!messageKeys.length) {
      return next(new ApiError(400, "No changes were made!"));
    }

    const updatedPost = await Post.findOneAndUpdate(
      { slug },
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedPost) {
      return next(new ApiError(500, "Error updating post! Please try again"));
    }

    const message = messageKeys.join(" and ") + " updated successfully";
    return res.status(200).json(new ApiResponse(200, updatedPost, message));
  } catch (error) {
    next(new ApiError(500, "Something went wrong while updating the post!"));
  }
});

const deletePost = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const isAdmin = req.user?.isAdmin;
    const reqUserId = req.params?.userId;
    const postId = req.params?.postId;
    // console.log(userId, isAdmin, postId, reqUserId);

    const isAuthor = userId.toString() === reqUserId.toString();
    if (!isAdmin && !isAuthor) {
      return next(
        new ApiError(403, "You are not allowed to delete this post!")
      );
    }

    const postToDelete = await Post.findById(postId).select("postImg");
    if (!postToDelete) {
      return next(new ApiError(404, "Post not found"));
    }

    await deleteFromCloudinary(postToDelete.postImg);
    await Post.findByIdAndDelete(postId);

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Post has been deleted"));
  } catch (error) {
    next(
      new ApiError(
        500,
        "Something went wrong while deleting the post! Try again!"
      )
    );
  }
});

export { createNewPost, updatePost, deletePost };
