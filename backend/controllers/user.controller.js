import {
  asyncHandler,
  ApiResponse,
  ApiError,
  uploadOnCloudinary,
  welcomeEmail,
} from "../utils/index.utils.js";
import { User } from "../models/user.model.js";

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
          admin: user.isAdmin
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
            admin: user.isAdmin
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
  const { password } = req.body;
  const userId = req.user?._id;

  if (!password) {
    return next(new ApiError(400, "Password is required for delete account"));
  }
  if (password.length < 6) {
    return next(new ApiError(400, "Password should be at least 6 characters"));
  }

  const user = await User.findById(userId);

  const isPasswordValid = await user.isPasswordTrue(password);

  if (isPasswordValid) {
    await User.findByIdAndDelete(userId);
  } else {
    return next(new ApiError(401, "Invalid password"));
  }

  return res.status(200).json(new ApiResponse(200, {}, "User Deleted"));
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

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar.url) {
    return next(
      new ApiError(400, "Something went wrong while uploading avatar! please try again!")
    );
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
      new ApiError(400, "Please provide at least a username or an email to update.")
    );
  }

  const user = await User.findById(userId);
  if (!user) {
    return next(new ApiError(404, "User not found!"));
  }

  // Check if the new username or email already exists in the database
  if (username || email) {
    const existedInfo = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (existedInfo) {
      return next(
        new ApiError(401, "This username or email already exists. Please enter a unique one.")
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
      new ApiError(500, "Something went wrong while updating user details. Please try again!")
    );
  }

  return res.status(200).json(new ApiResponse(200, updatedUser, message));
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
};
