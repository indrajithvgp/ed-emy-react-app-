import mongoose from "mongoose";
const { Schema } = mongoose;

const completedSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: "User",
    },
    course: {
      type: Schema.ObjectId,
      ref: "Course",
    },
    lessons:[]
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Completed", completedSchema);
