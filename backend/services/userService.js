const prisma = require("../config/prisma");
exports.getProfile = async (userId) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true
        }
    });
    return user;
};
exports.updateProfile = async (userId, userData) => {
    const { name, email } = userData;
    // Check if another user already has this email
    const existingUser = await prisma.user.findFirst({
        where: {
            email: email,
            NOT: {
                id: userId
            }
        }
    });
    if (existingUser) {
        throw new Error("Email is already in use.");
    }
    // Update profile //
    const updatedUser = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            name,
            email
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true
        }
    });
    return updatedUser;
};