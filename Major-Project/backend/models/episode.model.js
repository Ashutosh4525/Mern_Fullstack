import mongoose from "mongoose";

const episodeSchema = new mongoose.Schema(
  {
    seasonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Season",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    episodeNumber: Number,
    video: {
      url: String,
      public_id: String
    },
    duration: Number,
  },
  { timestamps: true }
);
episodeSchema.index(
  { seasonId: 1, episodeNumber: 1 },
  { unique: true }
);
const Episode = mongoose.model("Episode", episodeSchema);
export default Episode;