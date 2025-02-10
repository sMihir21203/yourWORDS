import {Router} from "express"
import { signInUser, signUpUser } from "../controllers/user.controller.js";
import { uploadData } from "../middlewares/index.middlewares.js";

export const userRouter = Router();

userRouter.route("/sign-up").post(uploadData,signUpUser);
userRouter.route("/sign-in").post(uploadData,signInUser)

