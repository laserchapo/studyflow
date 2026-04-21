const express = require("express");
const router = express.Router();
const { getSessions, createSession } = require("../controllers/studySessionController");

router.get("/", getSessions);
router.post("/", createSession);

module.exports = router;
