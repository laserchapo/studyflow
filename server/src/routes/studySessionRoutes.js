const express = require("express");
const router = express.Router();
const { getSessions, createSession, deleteSession } = require("../controllers/studySessionController");

router.get("/", getSessions);
router.post("/", createSession);
router.delete("/:id", deleteSession);

module.exports = router;
