-- CreateTable
CREATE TABLE "chapter_progress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "chapterId" TEXT NOT NULL,
    "percent" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chapter_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "study_activity" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "study_activity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "chapter_progress_userId_chapterId_key" ON "chapter_progress"("userId", "chapterId");

-- CreateIndex
CREATE UNIQUE INDEX "study_activity_userId_date_key" ON "study_activity"("userId", "date");

-- AddForeignKey
ALTER TABLE "chapter_progress" ADD CONSTRAINT "chapter_progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chapter_progress" ADD CONSTRAINT "chapter_progress_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "chapters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "study_activity" ADD CONSTRAINT "study_activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
