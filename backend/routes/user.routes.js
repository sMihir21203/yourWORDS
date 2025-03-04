import { Router } from "express";
import {
  deleteUser,
  googleAuth,
  logOutUser,
  signInUser,
  signUpUser,
  updateUserAvatar,
  updateUserDetails,
} from "../controllers/user.controller.js";
import { upload, veryfyJWT } from "../middlewares/index.middlewares.js";

export const userRouter = Router();

userRouter.route("/sign_up").post(signUpUser);
userRouter.route("/sign_in").post(signInUser);
userRouter.route("/google_auth").post(googleAuth);
userRouter.route("/logout").get(veryfyJWT,logOutUser);
userRouter.route("/delete_user").post(veryfyJWT,deleteUser);
userRouter
  .route("/update_avatar")
  .post(veryfyJWT, upload.single("avatar"), updateUserAvatar);
userRouter.route("/update_details").post(veryfyJWT, updateUserDetails);
