import { Router } from "express";
import {
  createNewPost,
  deletePost,
  updatePost,
} from "../controllers/post.controller.js";
import { upload, veryfyJWT } from "../middlewares/index.middlewares.js";

export const postRouter = Router();

postRouter
  .route("/create-newpost")
  .post(veryfyJWT, upload.single("postImg"), createNewPost);

postRouter
  .route("/:userId/:slug/update-post")
  .post(veryfyJWT, upload.single("postImg"), updatePost);

postRouter.route("/:userId/:postId/delete-post").get(veryfyJWT, deletePost);
