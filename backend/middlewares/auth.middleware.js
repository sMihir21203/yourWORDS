import {ApiError,asyncHandler} from '../utils/index.utils.js'
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"

export const veryfyJWT = asyncHandler(async(req,res,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
    
        if (!token) {
            return next(new ApiError(401,"Unauthorized request"))
        }
    
       const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    
       const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
       if (!user) {
        return next(new ApiError(401, "Invalid access token"));
      }
       req.user=user
       next()
    } catch (error) {
        next(new ApiError(401, "Invalid or expired token"));
    }
})
