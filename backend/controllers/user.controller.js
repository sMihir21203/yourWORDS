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

const signUpUser = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if ([username, email, password].some((field) => !field?.trim())) {
      return res.status(400).json(new ApiError(400, "All fields are required"));
    }

    const existedUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (existedUser) {
      return res
        .status(409)
        .json(
          new ApiError(409, "User With this Email or Username already exist!")
        );
    }

    const newUser = await User.create({
      username,
      email,
      password,
    });

    const createdUser = User.findById(newUser._id).select(
      "-password -refreshToken"
    );
    if (!createdUser) {
      return res
        .status(500)
        .json(
          new ApiError(500, "Something went wrong while registering the user")
        );
    }

    console.log("Registerd User: ", req.body);

    return res
      .status(201)
      .json(new ApiResponse(201, existedUser, "User SignUp SuccessFully"));
  } catch (error) {
    console.error("SignUp Err: ", error);
    return res
      .status(500)
      .json(
        new ApiError(500, "Something Went Wrong While Registering The User")
      );
  }
});

const signInUser = asyncHandler(async (req, res) => {
  //data from body
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ApiError(400, "All fields are mandatory");
  }

  //find user
  const user = await User.findOne({
    $or: [{ username }],
  });
  if (!user ) {
    throw new ApiError(404, "User Not Found");
  }

  //password check
  const isPasswordValid= await user.isPasswordTrue(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid Password Please Entere Valid Password");
  }

  //generate tokens
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
    .status(201)
    .cookie("accessTkoen", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in SuccessFully"
      )
    );
});

export { signUpUser, signInUser };
