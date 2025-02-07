import { asyncHandler, ApiResponse, ApiError } from "../utils/index.utils.js";
import { User} from "../models/user.model.js";

const signUpUser = asyncHandler(async (req, res) => {
  try {
    const {username, email, password} = req.body

    if([username,email,password].some((field)=>!field?.trim())){
      return res.status(400).json(new ApiError(400,"All fields are required"))
    }

    const existedUser = await User.findOne({
      $or:[{username},{email}]
    })
    if(existedUser){
      return res.status(409).json(new ApiError(409,"User With this Email or Username already exist!"))
    }

    const newUser = await User.create({
      username,
      email,
      password
    })

    const createdUser = User.findById(newUser._id).select(
      "-password -refreshToken"
    )
    if(!createdUser){
      return res
        .status(500)
        .json(new ApiError(
          500,
          "Something went wrong while registering the user"
        ))
    }

    console.log("Registerd User: ", req.body)

    return res
              .status(201)
              .json(new ApiResponse(
                201,
                existedUser,
                "User SignUp SuccessFully"
              ))
  } catch (error) {
    console.error("SignUp Err: ",error)
    return res
      .status(500)
      .json(new ApiError(
        500, "Something Went Wrong While Registering The User"
      ))
  }
});

export { signUpUser };
