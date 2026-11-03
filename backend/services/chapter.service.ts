import { prisma } from "../utils/prisma";
import { HttpError } from "../utils/httpError";
import { assertEnrolled } from "./subject.service";

const chapterInclude = (userId: string) =>
  ({
    // the current student's row: completion + reading position
    progress: { where: { studentId: userId }, select: { percent: true, completedAt: true } },
    _count: { select: { quizzes: true } },
  }) as const;

const findChapter = (id: string, userId: string) =>
  prisma.chapter.findUnique({ where: { id }, include: chapterInclude(userId) });

type Row = NonNullable<Awaited<ReturnType<typeof findChapter>>>;

const toChapterDto = (c: Row) => ({
  id: c.id,
  subjectId: c.subjectId,
  chapterNo: c.chapterNo,
  cardImage: c.cardImage,
  title: c.title,
  description: c.description,
  durationMinutes: c.durationMinutes,
  objectives: c.objectives,
  videoUrl: c.videoUrl,
  slideUrl: c.slideUrl,
  sections: c.sections,
  keyTerms: c.keyTerms,
  references: c.references,
  createdAt: c.createdAt,
  updatedAt: c.updatedAt,
  completed: !!c.progress[0]?.completedAt, // set by "Mark as Complete"
  completedAt: c.progress[0]?.completedAt ?? null,
  quizCount: c._count.quizzes, // quizzes that cover this chapter
});

export async function listChapters(userId: string, role: string, subjectId: string) {
  await assertEnrolled(userId, role, subjectId);
  const rows = await prisma.chapter.findMany({
    where: { subjectId },
    orderBy: { chapterNo: "asc" },
    include: chapterInclude(userId),
  });
  return rows.map(toChapterDto);
}

export async function getChapter(userId: string, role: string, id: string) {
  const chapter = await findChapter(id, userId);
  if (!chapter) throw new HttpError(404, "Chapter not found");
  await assertEnrolled(userId, role, chapter.subjectId);
  return toChapterDto(chapter);
}
