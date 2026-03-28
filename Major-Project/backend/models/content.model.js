import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index:true,
    },
    description: String,
    type: {
      type: String,
      enum: ["movie", "tv"],
      required: true,
    },
    categoryIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    averageRating: {
        type: Number,
        default: 0
    },
    totalRatings: {
        type: Number,
        default: 0
    },
    // language: String,
    // audioLanguages: [String],
    // subtitleLanguages: [String],
    // quality: {
    //     type: String,
    //     enum: ["480p", "720p", "1080p", "4K"],
    //     default:"480p",
    // },
    // thumbnail: String,
    poster:{
        url:String,
        public_id:String
    },
    releaseDate: Date,
    trailer:{
        url:String,
        public_id:String
    },
    rentalPrice:{
        type:Number
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  { timestamps: true }
);

const Content=mongoose.model("Content", contentSchema);
export default Content;