//  receive,send,collect lll ///
const authService = require("../services/authService");
exports.signup = async (req, res) => {
    try {
        const result = await authService.signupUser(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
exports.login = async (req, res) => {
    try {
        const result = await authService.loginUser(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};