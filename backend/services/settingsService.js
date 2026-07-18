const prisma = require("../config/prisma");
exports.getSettings = async (userId) => {
    let settings = await prisma.settings.findUnique({
        where: {
            userId: userId
        }
    });
    if (!settings) {
        settings = await prisma.settings.create({
            data: {
                userId: userId
            }
        });
    }
    return settings;
};
exports.updateSettings = async (userId, data) => {
    let settings = await prisma.settings.findUnique({
        where: {
            userId: userId
        }
    });
    if (!settings) {
        settings = await prisma.settings.create({
            data: {
                userId: userId
            }
        });

    }
    settings = await prisma.settings.update({
        where: {
            userId: userId
        },
        data: {
            focusDuration: data.focusDuration,
            breakDuration: data.breakDuration,
            notificationsEnabled: data.notificationsEnabled,
            blockedApps: data.blockedApps
        }
    });
    return settings;
};