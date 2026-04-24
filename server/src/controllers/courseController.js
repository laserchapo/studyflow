const Course = require("../models/Course");

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("userId", "name email program");
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};

const createCourse = async (req, res) => {
  try {
    const { name, seminarDate, examDate, difficultyLevel, userId } = req.body;

    if (!name || !seminarDate || !examDate || !difficultyLevel || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const course = await Course.create({ name, seminarDate, examDate, difficultyLevel, userId });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: "Failed to create course" });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { name, seminarDate, examDate, difficultyLevel, userId } = req.body;

    if (!name || !seminarDate || !examDate || !difficultyLevel || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { name, seminarDate, examDate, difficultyLevel, userId },
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Failed to update course" });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete course" });
  }
};

module.exports = {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse
};
