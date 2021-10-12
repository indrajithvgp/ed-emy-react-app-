import mongoose from "mongoose";
const { Schema } = mongoose;

const lessonSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    content: {
      type: {},
    },
    video_link: {},
    free_preview: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const courseSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: {},
      required: true,
    },
    price: {
      type: Number,
      default: 9.99,
    },
    image: {},
    category: {
      type: String,
    },
    published: {
      type: Boolean,
      default: false,
    },
    paid: {
      type: Boolean,
      default: true,
    },
    instructor: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    lessons: [lessonSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Course", courseSchema);
