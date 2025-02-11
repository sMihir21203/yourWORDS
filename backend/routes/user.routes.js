import {Router} from "express"
import { googleAuth, signInUser, signUpUser } from "../controllers/user.controller.js";
import { uploadData } from "../middlewares/index.middlewares.js";

export const userRouter = Router();

userRouter.route("/sign_up").post(uploadData,signUpUser);
userRouter.route("/sign_in").post(uploadData,signInUser)
userRouter.route("/google_auth").post(uploadData,googleAuth)

