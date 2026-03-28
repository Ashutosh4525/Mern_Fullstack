import mongoose from "mongoose";

const seasonSchema = new mongoose.Schema(
  {
    contentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Content",
      required: true,
    },

    seasonNumber: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

seasonSchema.index(
  { contentId: 1, seasonNumber: 1 },
  { unique: true }
);
const Season=mongoose.model("Season", seasonSchema);
export default Season;