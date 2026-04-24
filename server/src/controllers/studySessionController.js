const StudySession = require("../models/StudySession");

const getSessions = async (req, res) => {
  try {
    const sessions = await StudySession.find()
      .populate("userId", "name email")
      .populate("courseId", "name");

    res.status(200).json(sessions);
  } catch (error) {
    console.error("GET SESSIONS ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const createSession = async (req, res) => {
  try {
    const { userId, courseId, date, duration, topic, notes, focusLevel, energyLevel } = req.body;

    if (!userId || !courseId || !date || !duration || !topic || !focusLevel || !energyLevel) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const session = await StudySession.create({
      userId,
      courseId,
      date,
      duration,
      topic,
      notes,
      focusLevel,
      energyLevel
    });

    res.status(201).json(session);
  } catch (error) {
    console.error("CREATE SESSION ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const deleteSession = async (req, res) => {
  try {
    const session = await StudySession.findByIdAndDelete(req.params.id);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    res.status(200).json({ message: "Session deleted" });
  } catch (error) {
    console.error("DELETE SESSION ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSessions,
  createSession,
  deleteSession
};
