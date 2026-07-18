const userService = require("../services/userService");
exports.getProfile = async (req, res) => {
    try {
        const user = await userService.getProfile(req.user.id);
        res.json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.updateProfile = async (req, res) => {
    try {
        const user = await userService.updateProfile(
            req.user.id,
            req.body
        );
        res.json({
            success: true,
            message: "Profile updated successfully!",
            user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
};