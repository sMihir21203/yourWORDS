import { Router } from "express";
import { veryfyJWT } from "../middlewares/index.middlewares.js";
import {
  addComment,
  getPostComments,
} from "../controllers/comment.controller.js";

export const commentRouter = Router();

commentRouter.route("/:postId/add-comment").post(veryfyJWT, addComment);
commentRouter.route("/:postId/comments").get(getPostComments);
