import { asyncHandler, ApiResponse, ApiError } from "../utils/index.utils.js";
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
  const user = await User.findOne(
   {username}
  );

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

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        201,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

export { signUpUser, signInUser };
