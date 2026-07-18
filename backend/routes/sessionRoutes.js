const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const sessionController = require("../controllers/sessionController");
router.post("/start", authMiddleware, sessionController.startSession);
router.patch("/end", authMiddleware, sessionController.endSession);
router.get("/history", authMiddleware, sessionController.getHistory);
module.exports = router;