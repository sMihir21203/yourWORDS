import { asyncHandler, ApiResponse, ApiError } from "../utils/index.utils.js";
import { User} from "../models/user.model.js";

const signUpUser = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (
        [username, email, password].some((field) => field?.trim() === "")
    ){
      throw new ApiError(400, "All fields are mandatory");
    }

    const existedUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (existedUser) {
      throw new ApiError(409, "User with email or username already exist");
    }

    const newUser = await User.create({
      username,
      email,
      password,
    });
    const createdUser = await User.findById(newUser._id).select(
      "-password -refreshToken"
    );
    if (!createdUser) {
      throw new ApiError(
        500,
        "Something went wrong while registering the user"
      );
    }

    return res
      .status(200)
      .json(new ApiResponse(201, createdUser, "SignUp Successfully"));
      console.log(req.body)
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while registering the user",
      "error: ",
      error
    );
  }
});

export { signUpUser };
