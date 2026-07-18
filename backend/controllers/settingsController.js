const settingsService = require("../services/settingsService");
exports.getSettings = async (req, res) => {
    try {
        const settings = await settingsService.getSettings(req.user.id);
        res.json({
            success: true,
            settings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.updateSettings = async (req, res) => {
    try {
        const settings = await settingsService.updateSettings(
            req.user.id,
            req.body
        );
        res.json({
            success: true,
            message: "Settings updated successfully!",
            settings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};