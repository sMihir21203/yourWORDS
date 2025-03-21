import {
  asyncHandler,
  ApiResponse,
  ApiError,
  uploadOnCloudinary,
  welcomeEmail,
  deleteFromCloudinary,
} from "../utils/index.utils.js";
import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";
import mongoose from "mongoose";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    //find user
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User Not Found");
    }

    //generate tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    //save refreshToken
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("error while tokens", error.message);
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh tokens"
    );
  }
};

const cookieOptions = {
  httpOnly: true,
  secure: true,
};

const makeRandomPassword = () => Math.random().toString(36).slice(-6);

const signUpUser = asyncHandler(async (req, res, next) => {
  //get info from body
  const { username, email, password } = req.body;
  if ([username, email, password].some((field) => field?.trim() === "")) {
    return next(new ApiError(400, "All fields are required"));
  }
  if (password.length < 6) {
    return next(
      new ApiError(400, "Password should be at least six characters")
    );
  }

  //checking if user already exist
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    return next(
      new ApiError(
        409,
        "User already exist with this either username or email "
      )
    );
  }

  //creating user
  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
  });

  //check if user created or not
  const newUser = await User.findById(user._id).select(
    "-password -refreshtoken"
  );
  if (!newUser) {
    return next(
      new ApiError(
        500,
        "Something went wrong while creating user please try again!"
      )
    );
  }

  await welcomeEmail(username, email, password);

  return res.status(200).json(
    new ApiResponse(
      201,
      {
        newUser,
      },
      "User SignUp Successfull! U can SignIn now!"
    )
  );
});

const signInUser = asyncHandler(async (req, res, next) => {
  // Get data from request body
  const { username, password } = req.body;

  if ([username, password].some((field) => field?.trim() === "")) {
    return next(new ApiError(400, "All fields are required"));
  }
  if (password.length < 6) {
    return next(
      new ApiError(400, "Password should be at least six characters")
    );
  }

  // Find user
  const user = await User.findOne({ username });

  if (!user) {
    return next(new ApiError(404, "User Not Found"));
  }

  // Password check
  const isPasswordValid = await user.isPasswordTrue(password);
  if (!isPasswordValid) {
    return next(new ApiError(401, "Invalid Password"));
  }

  // Generate tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        {
          loggedInUser,
          accessToken,
          refreshToken,
          admin: user.isAdmin,
        },
        "User logged in successfully"
      )
    );
});

const googleAuth = asyncHandler(async (req, res, next) => {
  //fetch data -> req.body
  const { email, name, googleImgUrl } = req.body;
  if ([email, name, googleImgUrl].some((field) => field?.trim() === "")) {
    return next(new ApiError(400, "Something Wrong Please Try Again"));
  }

  try {
    //check user exist or not
    let user = await User.findOne({ email });
    let isNewUser = false;

    //if new user then create user
    if (!user) {
      // Generating randomPassword
      const randomPassword = makeRandomPassword();

      // Create new user
      user = await User.create({
        username: name.replace(/\s/g, "").toLowerCase(),
        email,
        password: randomPassword,
        avatar: googleImgUrl,
        isGoogleAuth: true,
      });

      isNewUser = true;

      // console.log(`Generated password for ${email}: ${randomPassword}`);
      await welcomeEmail(user.username, user.email, randomPassword);
    }

    // Generate tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    // Fetch userData and remove -password -refreshToken
    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    return res
      .status(isNewUser ? 201 : 200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json(
        new ApiResponse(
          isNewUser ? 201 : 200,
          {
            loggedInUser,
            accessToken,
            refreshToken,
            admin: user.isAdmin,
          },
          isNewUser
            ? "User SignUp and SignIn successfully"
            : "User SignIn successfully"
        )
      );
  } catch (error) {
    console.error("Google Auth Error:", error);
    return next(new ApiError(500, "Internal Server Error"));
  }
});

const signOutUser = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  User.findByIdAndUpdate(
    userId,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(201)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, {}, "User LOGOUT"));
});

const deleteUser = asyncHandler(async (req, res, next) => {
  //password -> req.body
  //userId -> req.user._id
  //getUser
  //check Password Validation
  //getUserAllPosts and userAvatar
  //deleteThem
  //now delete the user
  //return res
  const { password } = req.body;
  const userId = req.user?._id;
  const isAdmin = req.user?.isAdmin;

  try {
    const user = await User.findById(userId).select("avatar password");
    if (!user) {
      return next(new ApiError(404, "User Not Found"));
    }

    if (!isAdmin) {
      if (!password) {
        return next(
          new ApiError(400, "Password is required to delete the account")
        );
      }
      const isPasswordValid = await user.isPasswordTrue(password);
      if (!isPasswordValid) {
        return next(new ApiError(401, "Invalid password"));
      }
    }

    const userPosts = await Post.find({ user: userId }).select("postImg");
    const postImgUrls = userPosts.map((post) => post.postImg);
    if (postImgUrls.length) {
      await Promise.all(postImgUrls.map(deleteFromCloudinary));
    }
    if (user.avatar) {
      await deleteFromCloudinary(user.avatar);
    }

    await Post.deleteMany({ user: userId });
    await User.findByIdAndDelete(userId);

    return res.status(200).json(new ApiResponse(200, {}, "User Deleted"));
  } catch (error) {
    // console.error("Delete User Error:", error.message);
    return next(
      new ApiError(500, "Something went wrong while deleting the account!")
    );
  }
});

const resetForgetPassword = asyncHandler(async () => {});

const updateUserPassword = asyncHandler(async (req, res, next) => {
  //check password is available
  //check valid old password
  //check new password is available
  //set new password
  //return response
  const { currentPassword, newPassword } = req.body;
  const userId = req.user?._id;

  if (currentPassword.length < 6)
    return next(
      new ApiError(400, "Current Password should be at least 6 characters")
    );

  if (newPassword.length < 6)
    return next(
      new ApiError(400, "New Password should be at least 6 characters")
    );

  if (currentPassword === newPassword) {
    return next(new ApiError(400, "New Password must be unique!"));
  }
  const user = await User.findById(userId);

  const isPasswordValid = await user.isPasswordTrue(currentPassword);
  if (!isPasswordValid) {
    return next(new ApiError(401, "Current Password is Invalid"));
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(201)
    .json(new ApiResponse(201, {}, "Password changed successfully"));
});

const updateUserAvatar = asyncHandler(async (req, res, next) => {
  // console.log(req)
  const avatarLocalPath = req.file?.path;
  const userId = req.user?._id;

  if (!avatarLocalPath) {
    return next(new ApiError(400, "Avatar file is missing"));
  }

  const userInfo = await User.findById(userId).select("avatar");

  await deleteFromCloudinary(userInfo.avatar);

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar.url) {
    return next(new ApiError(400, "Error uploading avatar. Try again!"));
  }

  const user = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar updated successfully!"));
});

const updateUserDetails = asyncHandler(async (req, res, next) => {
  const { username, email } = req.body;
  const userId = req.user?._id;

  if (!username && !email) {
    return next(
      new ApiError(
        400,
        "Please provide at least a username or an email to update."
      )
    );
  }

  const user = await User.findById(userId);
  if (!user) {
    return next(new ApiError(404, "User not found!"));
  }

  // Check if the new username or email already exists in the database
  if (username || email) {
    const existedInfo = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existedInfo) {
      return next(
        new ApiError(
          401,
          "This username or email already exists. Please enter a unique one."
        )
      );
    }
  }

  let updatedFields = {};
  let message = "";

  if (username && !email) {
    updatedFields.username = username;
    message = "Username updated successfully.";
  } else if (email && !username) {
    updatedFields.email = email;
    message = "Email updated successfully.";
  } else if (username && email) {
    updatedFields.username = username;
    updatedFields.email = email;
    message = "Username and email updated successfully.";
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: updatedFields },
    { new: true }
  ).select("-password");

  if (!updatedUser) {
    return next(
      new ApiError(
        500,
        "Something went wrong while updating user details. Please try again!"
      )
    );
  }

  return res.status(200).json(new ApiResponse(200, updatedUser, message));
});

const getUserPosts = asyncHandler(async (req, res, next) => {
  const toObjectId = (id) => (id ? new mongoose.Types.ObjectId(id) : null);
  const getQueryValue = (value) => value || null;

  const userId = toObjectId(req.params.userId);
  const postId = toObjectId(req.query.postId);
  const slug = getQueryValue(req.query.slug);
  const category = getQueryValue(req.query.category);
  const searchQuery = getQueryValue(req.query.search);
  const setStartIndex = parseInt(req.query.setStartIndex) || 0;

  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);

  let matchCondition = {};
  if (userId) matchCondition.userId = userId;
  if (postId) matchCondition._id = postId;
  if (slug) matchCondition.slug = slug;
  if (category) matchCondition.postCategory = category;
  if (searchQuery)
    matchCondition.postContent = { $regex: searchQuery, $options: "i" };

  try {
    const userAllPosts = await Post.aggregate([
      {
        $match: matchCondition, // Filters based on query params
      },
      {
        $facet: {
          userAllPostsData: [
            { $sort: { createdAt: -1 } },
            { $skip: setStartIndex },
            { $limit: 9 },
            {
              $project: {
                _id: 1,
                createdAt: 1,
                updatedAt: 1,
                slug: 1,
                postTitle: 1,
                postImg: 1,
                postCategory: 1,
                postContent: 1,
              },
            },
          ],
          counts: [
            {
              $group: {
                _id: null,
                totalPosts: { $sum: 1 },
                lastWeekTotalPosts: {
                  $sum: {
                    $cond: {
                      if: { $gte: ["$createdAt", lastWeek] },
                      then: 1,
                      else: 0,
                    },
                  },
                },
              },
            },
          ],
        },
      },
    ]);

    const userPosts = userAllPosts?.[0]?.userAllPostsData || [];
    if (!userPosts.length) {
      return next(new ApiError(404, "No Posts Found!"));
    }
    const totalPosts = userAllPosts?.[0]?.counts?.[0]?.totalPosts || 0;
    const lastWeekTotalPosts =
      userAllPosts?.[0]?.counts?.[0]?.lastWeekTotalPosts || 0;

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          userPosts,
          totalPosts,
          lastWeekTotalPosts,
        },
        "User Posts Fetched Successfully"
      )
    );
  } catch (error) {
    return next(
      new ApiError(500, "Something went wrong while fetching posts!")
    );
  }
});

const getUsers = asyncHandler(async (req, res, next) => {
  const isAdmin = req.user?.isAdmin;
  if (!isAdmin) {
    return next(
      new ApiError(403, "You Are Not Allowed to Access! Admins only.")
    );
  }

  try {
    const users = await User.find({}).select("-password");
    if (!users.length) {
      return next(new ApiError(404, "No Users Found"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, users, "Users Fetched Successfully"));
  } catch (error) {
    return next(new ApiError(500, "Failed To Fetch Users!"));
  }
});

export {
  signUpUser,
  signInUser,
  googleAuth,
  signOutUser,
  deleteUser,
  resetForgetPassword,
  updateUserPassword,
  updateUserAvatar,
  updateUserDetails,
  getUserPosts,
  getUsers,
};
