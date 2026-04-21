const mongoose = require("mongoose");

const studySessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"]
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Course ID is required"]
    },
    date: {
      type: Date,
      required: [true, "Date is required"]
    },
    duration: {
      type: Number,
      required: [true, "Duration is required"],
      min: 1
    },
    topic: {
      type: String,
      required: [true, "Topic is required"],
      trim: true
    },
    notes: {
      type: String,
      default: ""
    },
    focusLevel: {
      type: Number,
      required: [true, "Focus level is required"],
      min: 1,
      max: 10
    },
    energyLevel: {
      type: Number,
      required: [true, "Energy level is required"],
      min: 1,
      max: 10
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("StudySession", studySessionSchema);
