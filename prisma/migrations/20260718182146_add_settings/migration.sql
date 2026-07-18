-- CreateTable
CREATE TABLE "Settings" (
    "id" SERIAL NOT NULL,
    "focusDuration" INTEGER NOT NULL DEFAULT 25,
    "breakDuration" INTEGER NOT NULL DEFAULT 5,
    "notificationsEnabled" BOOLEAN NOT NULL DEFAULT true,
    "blockedApps" TEXT NOT NULL DEFAULT '',
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Settings_userId_key" ON "Settings"("userId");

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
