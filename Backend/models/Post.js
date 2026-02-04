import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth", // 🔥 MUST MATCH Auth model
      required: true,
    },

    caption: {
      type: String,
      trim: true,
    },

    image: {
      type: String, // Cloudinary URL
      default: null,
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "auth", // 🔥 SAME HERE
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
