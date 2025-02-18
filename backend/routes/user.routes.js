import {Router} from "express"
import { googleAuth, signInUser, signUpUser, updateUserAvatar } from "../controllers/user.controller.js";
import { upload, veryfyJWT } from "../middlewares/index.middlewares.js";

export const userRouter = Router();

userRouter.route("/sign_up").post(signUpUser);
userRouter.route("/sign_in").post(signInUser)
userRouter.route("/google_auth").post(googleAuth)
userRouter.route("/update_avatar").post(veryfyJWT,upload.single("avatar"),updateUserAvatar)

