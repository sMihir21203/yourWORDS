import { Schema, model } from "mongoose";

const commentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    comment: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
      default: [],
    },
    totalLikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Comment = model("Comment", commentSchema);
