import {
  asyncHandler,
  ApiResponse,
  ApiError,
  uploadOnCloudinary,
} from "../utils/index.utils.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

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
      new ApiError(409, "User already exist with this username and password")
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

  return res
    .status(200)
    .json(new ApiResponse(201, newUser, "User SignUp Successfull"));
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
          user: loggedInUser,
          accessToken,
          refreshToken,
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
      // Generating randomPass & hash it
      const randomPassword = makeRandomPassword();
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      // Create new user
      user = await User.create({
        username: name.replace(/\s/g, "").toLowerCase(),
        email,
        password: hashedPassword,
        avatar: googleImgUrl,
        isGoogleAuth: true,
      });

      isNewUser = true;

      console.log(`Generated password for ${email}: ${randomPassword}`);
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
            user: loggedInUser,
            accessToken,
            refreshToken,
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

const updateUserAvatar = asyncHandler(async (req, res, next) => {
  console.log(req.file)
  const avatarLocalPath = req.file?.path;
  const userId = req.user?._id;

  if (!avatarLocalPath) {
    return next(new ApiError(400, "Avatar file is missing"));
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar.url) {
    return next(
      new ApiError(400, "Something went wrong while uploading avatar")
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

export { signUpUser, signInUser, googleAuth, updateUserAvatar };
