import {asyncHandler,ApiResponse,ApiError} from "../utils/index.utils.js"

const signUpUser = asyncHandler(async(req,res)=>{
   return await res.status(200).json({
    message1: "Radhe Radhe",
    message2: "RadheKrishn",
    message3: "Jay Shree Krishn"
   })
})

export{
    signUpUser
}