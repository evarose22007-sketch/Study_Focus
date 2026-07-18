const sessionService = require("../services/sessionService");
exports.startSession = async (req, res) => {
    try {
        const session = await sessionService.startSession(req.user.id);
        res.status(201).json({
            success: true,
            message: "Study session started!",
            session
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
exports.endSession = async (req, res) => {
    try {
        const session = await sessionService.endSession(req.user.id);
        res.json({
            success: true,
            message: "Study session ended!",
            session
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
exports.getHistory = async (req, res) => {
    try {
        const sessions = await sessionService.getHistory(req.user.id);
        res.json({
            success: true,
            sessions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};