import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    postTitle: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    postCategory: {
      type: String,
      default: "Uncategorized",
    },
    postImg: {
      type: String,
      default:
        "https://dinarakasko.com/image/cache/catalog/basel-demo/blog-1140x700.png",
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
