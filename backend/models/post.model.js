import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    postTitle: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    postCategory: {
      type: String,
      index: true,
    },
    postImg: {
      type: String,
    },
    postContent: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const Post = model("Post", postSchema);
