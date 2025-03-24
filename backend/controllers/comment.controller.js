import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { ApiError, ApiResponse, asyncHandler } from "../utils/index.utils.js";

const addComment = asyncHandler(async (req, res, next) => {
  const { comment } = req.body;
  const userId = req?.user?._id;
  const postId = req?.params?.postId;

  try {
    if (!comment) {
      return next(new ApiError(400, "Write something to Comment!"));
    }

    const newComment = await Comment.create({
      comment,
      userId,
      postId,
    });

    if (!newComment) {
      return next(
        new ApiError(500, "Failed To Add Comment! please try Again!")
      );
    }

    return res
      .status(200)
      .json(new ApiResponse(200, newComment, "Radhe Radhe"));
  } catch (error) {
    return next(
      new ApiError(
        500,
        "Something gone wrong while Adding the Comment! backend issue!"
      )
    );
  }
});

const getPostComments = asyncHandler(async (req, res, next) => {
  const postId = new mongoose.Types.ObjectId(req?.params?.postId);
  const setStartIndex = parseInt(req?.query?.setStartIndex) || 0;

  try {
    if (!postId) {
      return next(new ApiError(400, "postId is Missing"));
    }

    const comments = await Comment.aggregate([
      { $match: { postId: postId } },
      { $sort: { createdAt: -1 } },
      {
        $facet: {
          commentsData: [
            { $skip: setStartIndex },
            { $limit: 11 },
            {
              $project: {
                _id: 1,
                createdAt: 1,
                updatedAt: 1,
                comment: 1,
                likes: 1,
                totalLikes: 1,
                userId: 1,
                postId: 1,
              },
            },
          ],
        },
      },
    ]);

    const postComments = comments?.[0]?.commentsData || [];
    if (!postComments.length) {
      return next(new ApiError(404, "No Comments Yet!"));
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, postComments, "post comments fetched successfully")
      );
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(
        500,
        "Something gone wrong while fetching the post Comments! backend issue!"
      )
    );
  }
});

export { addComment, getPostComments };
