import { Router } from "express";
import {
  deleteUser,
  googleAuth,
  signOutUser,
  signInUser,
  signUpUser,
  updateUserAvatar,
  updateUserDetails,
  updateUserPassword,
  getUserPosts,
  getUsers,
  getUser,
  sendResetPassLink,
  resetPassword,
} from "../controllers/user.controller.js";
import { upload, veryfyJWT } from "../middlewares/index.middlewares.js";

export const userRouter = Router();

userRouter.route("/sign-up").post(signUpUser);
userRouter.route("/sign-in").post(signInUser);
userRouter.route("/google-auth").post(googleAuth);
userRouter.route("/sign-out").get(veryfyJWT, signOutUser);
userRouter.route("/:userId/delete-user").post(veryfyJWT, deleteUser);
userRouter.route("/reset-link").post(sendResetPassLink);
userRouter.route("/:resetPassToken/reset-pass").post(resetPassword);
userRouter.route("/update-password").post(veryfyJWT, updateUserPassword);
userRouter
  .route("/update-avatar")
  .post(veryfyJWT, upload.single("avatar"), updateUserAvatar);
userRouter.route("/update-details").post(veryfyJWT, updateUserDetails);
userRouter.route("/posts").get(veryfyJWT, getUserPosts);
userRouter.route("/get-users").get(veryfyJWT, getUsers);
userRouter.route("/:userId").get(getUser);
