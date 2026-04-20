const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Course name is required"],
      trim: true
    },
    seminarDate: {
      type: Date,
      required: [true, "Seminar date is required"]
    },
    examDate: {
      type: Date,
      required: [true, "Exam date is required"]
    },
    difficultyLevel: {
      type: Number,
      required: [true, "Difficulty level is required"],
      min: 1,
      max: 5
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Course", courseSchema);
