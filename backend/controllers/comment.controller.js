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

const likeComment = asyncHandler(async (req, res, next) => {
  const commentId = req.params?.commentId;
  const userId = req.user?._id;

  if (!userId || !commentId) {
    return next(new ApiError(400, "U need to signIn to likeComment"));
  }

  try {
    const comment = await Comment.findOneAndUpdate(
      { _id: commentId },
      [
        {
          $set: {
            likes: {
              $cond: {
                if: { $in: [userId, "$likes"] },
                then: { $setDifference: ["$likes", [userId]] },
                else: { $concatArrays: ["$likes", [userId]] },
              },
            },
            totalLikes: {
              $cond: {
                if: { $in: [userId, "$likes"] },
                then: { $subtract: ["$totalLikes", 1] },
                else: { $add: ["$totalLikes", 1] },
              },
            },
          },
        },
      ],
      { new: true }
    );

    if (!comment) {
      return next(new ApiError(500, "failed to like comment,Backend"));
    }

    const message = comment.likes.includes(userId) ? "Liked" : "Unliked";
    res.status(200).json(new ApiResponse(200, comment, message));
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "failed to likeComment! backend issue!"));
  }
});

const editComment = asyncHandler(async (req, res, next) => {
  const { editedComment } = req.body;
  const commentId = req.params.commentId;
  const reqUserId = req.params.userId;
  const userId = req.user._id;
  const isAdmin = req.user.isAdmin;
  const author = reqUserId.toString() === userId.toString();

  try {
    if (!editedComment) {
      return next(new ApiError(400, "type something to edit the comment"));
    }

    if (!isAdmin && !author) {
      return next(new ApiError(400, "You are not allowed to edit this post"));
    }

    const comment = await Comment.findByIdAndUpdate(
      commentId,
      {
        $set: {
          comment: editedComment,
        },
      },
      {
        new: true,
      }
    );

    if (!comment) {
      return next(new ApiError(500, "failed to getUpdatedComment"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, comment, "comment successfully edited"));
  } catch (error) {
    console.error(error);
    return next(new ApiError(500, "Failed to update Comment! backend Issue!"));
  }
});

const deleteComment = asyncHandler(async (req, res, next) => {
  const commentId = req.params.commentId;
  const reqUserId = req.params.userId;
  const postId = req.params.postId;
  const userId = req.user._id;
  const isAdmin = req.user.isAdmin;

  try {
    const comment = await Comment.findById(commentId).select("postId");
    if (!comment) {
      return next(new ApiError(404, "Comment not Found!"));
    }
    const commentAuthor = reqUserId.toString() === userId.toString();
    const postAuthor = postId.toString() === comment.postId.toString();

    if (!isAdmin && !postAuthor && !commentAuthor) {
      return next(
        new ApiError(400, "you are not allowed to delete this comment!")
      );
    }

    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return next(
        new ApiError(500, "Failed to delete comment! backend issue!")
      );
    }

    return res.status(200).json(new ApiResponse(200, {}, "Comment Deleted"));
  } catch (error) {
    console.error(error);
    return next(
      new ApiError(500, "Something gone wrong while deleting the comment!")
    );
  }
});

const getCommentsOfUserPosts = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const isAdmin = req.user.isAdmin;
  const reqUserId = req.query.userId
    ? new mongoose.Types.ObjectId(req.query.userId)
    : null;
  const setLimit = parseInt(req.query?.setLimit) || 9;
  const setStartIndex = parseInt(req.query?.setStartIndex) || 0;
  console.log(setLimit);
  console.log(setStartIndex);

  if (!isAdmin && reqUserId?.toString() !== userId.toString()) {
    return next(
      new ApiError(
        403,
        "You are not allowed to access other users' post comments."
      )
    );
  }

  const matchCond = isAdmin
    ? reqUserId
      ? { "postsInfo.userId": reqUserId }
      : {}
    : { "postsInfo.userId": userId };

  try {
    const coms = await Comment.aggregate([
      {
        $lookup: {
          from: "posts",
          localField: "postId",
          foreignField: "_id",
          as: "postsInfo",
        },
      },
      { $unwind: "$postsInfo" },
      { $match: matchCond },
      {
        $facet: {
          totalComs: [{ $count: "count" }],
          comments: [
            { $sort: { createdAt: -1 } },
            { $skip: setStartIndex },
            { $limit: setLimit },
            {
              $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "usersInfo",
              },
            },
            { $unwind: "$usersInfo" },
            {
              $project: {
                _id: 1,
                createdAt: 1,
                comment: 1,
                totalLikes: 1,
                slug: "$postsInfo.slug",
                postTitle: "$postsInfo.postTitle",
                postImg: "$postsInfo.postImg",
                userId: "$usersInfo._id",
                username: "$usersInfo.username",
                avatar: "$usersInfo.avatar",
              },
            },
          ],
        },
      },
    ]);

    const comments = coms?.[0]?.comments || [];
    const totalComments = coms?.[0]?.totalComs?.[0]?.count || 0;

    if (!comments.length) {
      return next(new ApiError(404, "Comments not found"));
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { comments, totalComments },
          "All comments fetched successfully"
        )
      );
  } catch (error) {
    console.error(error);
    return next(
      new ApiError(500, "failed to fetch all posts comment! backend issue!")
    );
  }
});

export {
  addComment,
  getPostComments,
  likeComment,
  editComment,
  deleteComment,
  getCommentsOfUserPosts,
};
