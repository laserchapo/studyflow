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
      return res.status(400).json({
        message: "Name, seminarDate, examDate, difficultyLevel, and userId are required"
      });
    }

    const course = await Course.create({
      name,
      seminarDate,
      examDate,
      difficultyLevel,
      userId
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: "Failed to create course" });
  }
};

module.exports = {
  getCourses,
  createCourse
};
