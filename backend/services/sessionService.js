const prisma = require("../config/prisma");
exports.startSession = async (userId) => {
    const activeSession = await prisma.session.findFirst({
        where: {
            userId: userId,
            endTime: null
        }
    });
    if (activeSession) {
        throw new Error("You already have an active study session.");
    }
    // New session //
    const session = await prisma.session.create({
        data: {
            userId: userId,
            startTime: new Date()
        }
    });
    return session;
};
// To End sessiom //
exports.endSession = async (userId) => {
    const session = await prisma.session.findFirst({
        where: {
            userId: userId,
            endTime: null
        }
    });
    if (!session) {
        throw new Error("No active study session found.");
    }
    const endTime = new Date();
    const duration = Math.floor(
        (endTime - session.startTime) / (1000 * 60)
    );
    const updatedSession = await prisma.session.update({
        where: {
            id: session.id
        },
        data: {
            endTime: endTime,
            duration: duration
        }
    });
    return updatedSession;
};
// History //
exports.getHistory = async (userId) => {
    const sessions = await prisma.session.findMany({
        where: {
            userId: userId
        },
        orderBy: {
            startTime: "desc"
        }
    });
    return sessions;
};