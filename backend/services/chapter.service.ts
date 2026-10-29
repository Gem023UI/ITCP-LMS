import { prisma } from "../utils/prisma";
import { HttpError } from "../utils/httpError";
import { assertEnrolled } from "./subject.service";

const chapterInclude = (userId: string) =>
  ({
    quiz: {
      select: {
        id: true,
        attempts: { where: { userId }, select: { score: true, total: true } },
      },
    },
  }) as const;

const findChapter = (id: string, userId: string) =>
  prisma.chapter.findUnique({ where: { id }, include: chapterInclude(userId) });

type Row = NonNullable<Awaited<ReturnType<typeof findChapter>>>;

const toChapterDto = (c: Row) => ({
  id: c.id,
  subjectId: c.subjectId,
  chapterId: c.chapterId,
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
  hasQuiz: !!c.quiz,
  quizResult: c.quiz?.attempts[0] ?? null,
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