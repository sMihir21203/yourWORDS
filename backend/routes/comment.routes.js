import { Router } from "express";
import { veryfyJWT } from "../middlewares/index.middlewares.js";
import {
  addComment,
  editComment,
  getPostComments,
  likeComment,
  deleteComment,
} from "../controllers/comment.controller.js";

export const commentRouter = Router();

commentRouter.route("/:postId/add-comment").post(veryfyJWT, addComment);
commentRouter.route("/:postId/comments").get(getPostComments);
commentRouter.route("/:commentId/like").put(veryfyJWT, likeComment);
commentRouter.route("/:commentId/:userId/edit").post(veryfyJWT, editComment);
commentRouter
  .route("/:commentId/:userId/:postId/delete")
  .get(veryfyJWT, deleteComment);
