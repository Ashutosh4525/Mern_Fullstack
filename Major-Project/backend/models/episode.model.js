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
    duration: {
      type:Number,
      min:0
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    deletedAt: {
        type: Date,
        default: null,
    },
  },
  { timestamps: true }
);
episodeSchema.index(
  { seasonId: 1, episodeNumber: 1 },
  { unique: true }
);
const Episode = mongoose.model("Episode", episodeSchema);
export default Episode;