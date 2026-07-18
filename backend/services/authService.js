// to check mail and hash passwords ts //
const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
exports.signupUser = async (userData) => {
    const { name, email, password } = userData;
    // if exists //
    const existingUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    if (existingUser) {
        throw new Error("Email already registered.");
    }
    // Hash pass //
    const hashedPassword = await bcrypt.hash(password, 10);
    // Save the userr //
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });
    // No pass return for sr //
    return {
        success: true,
        message: "User registered successfully!",
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        }
    };
};
const jwt = require("jsonwebtoken");
exports.loginUser = async (loginData) => {
    const { email, password } = loginData;
    // Find user //
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    if (!user) {
        throw new Error("Invalid email or password.");
    }
    // Compare password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw new Error("Invalid email or password.");
    }
    // Gen JWT //
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );
    return {
        success: true,
        message: "Login is successful!",
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    };
};