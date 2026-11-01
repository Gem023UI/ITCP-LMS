import { prisma } from "../utils/prisma";
import { HttpError } from "../utils/httpError";
import {
  storedSectionsSchema,
  type ArticleInput,
  type ListArticlesQuery,
} from "../utils/article.validators";

export type Actor = { userId: string; role: string };

const isUniqueViolation = (err: unknown) =>
  typeof err === "object" && err !== null && "code" in err && err.code === "P2002";

const authorSelect = {
  id: true,
  firstName: true,
  lastName: true,
  imageUrl: true,
  role: true,
} as const;

// `likes` is filtered to the current user, so likedByMe costs no extra query
const articleInclude = (userId: string) =>
  ({
    author: { select: authorSelect },
    likes: { where: { userId }, select: { userId: true } },
  }) as const;

const findArticle = (id: string, userId: string) =>
  prisma.article.findUnique({ where: { id }, include: articleInclude(userId) });

type Row = NonNullable<Awaited<ReturnType<typeof findArticle>>>;

const sectionsOf = (value: unknown) => storedSectionsSchema.catch([]).parse(value);

const toBase = (a: Row) => ({
  id: a.id,
  title: a.title,
  coverImageUrl: a.coverImageUrl,
  likesCount: a.likesCount,
  likedByMe: a.likes.length > 0,
  createdAt: a.createdAt,
  updatedAt: a.updatedAt,
  author: a.author,
});

const toListItem = (a: Row) => ({
  ...toBase(a),
  excerpt: sectionsOf(a.sections)[0]?.content.slice(0, 160) ?? "",
});

const toDetail = (a: Row) => ({ ...toBase(a), sections: sectionsOf(a.sections) });

/* ------------------------------------------------------------------ */

export async function listArticles(userId: string, q: ListArticlesQuery) {
  const where = q.authorId ? { authorId: q.authorId } : {};
  const orderBy =
    q.sort === "popular"
      ? [{ likesCount: "desc" as const }, { createdAt: "desc" as const }]
      : [{ createdAt: "desc" as const }];

  const [rows, total] = await prisma.$transaction([
    prisma.article.findMany({
      where,
      orderBy,
      skip: (q.page - 1) * q.limit,
      take: q.limit,
      include: articleInclude(userId),
    }),
    prisma.article.count({ where }),
  ]);
  return { articles: rows.map(toListItem), page: q.page, limit: q.limit, total };
}

export async function getArticle(userId: string, id: string) {
  const article = await findArticle(id, userId);
  if (!article) throw new HttpError(404, "Article not found");
  return toDetail(article);
}

export async function createArticle(actor: Actor, input: ArticleInput) {
  // ADMIN cannot publish (also enforced by requireRole on the route)
  if (actor.role !== "TEACHER" && actor.role !== "STUDENT") {
    throw new HttpError(403, "Only teachers and students can publish articles");
  }
  const row = await prisma.article.create({
    data: { authorId: actor.userId, ...input },
    include: articleInclude(actor.userId),
  });
  return toDetail(row);
}

export async function updateArticle(actor: Actor, id: string, input: ArticleInput) {
  const existing = await prisma.article.findUnique({ where: { id }, select: { authorId: true } });
  if (!existing) throw new HttpError(404, "Article not found");
  if (existing.authorId !== actor.userId) throw new HttpError(403, "You can only edit your own articles");

  const row = await prisma.article.update({
    where: { id },
    data: input,
    include: articleInclude(actor.userId),
  });
  return toDetail(row);
}

// the author can delete their own article; ADMIN can delete any (moderation)
export async function deleteArticle(actor: Actor, id: string) {
  const existing = await prisma.article.findUnique({ where: { id }, select: { authorId: true } });
  if (!existing) throw new HttpError(404, "Article not found");
  if (actor.role !== "ADMIN" && existing.authorId !== actor.userId) {
    throw new HttpError(403, "You can only delete your own articles");
  }
  await prisma.article.delete({ where: { id } });
}

// like <-> unlike; row + cached counter change together in one transaction
export async function toggleLike(userId: string, articleId: string) {
  try {
    return await prisma.$transaction(async (tx) => {
      const article = await tx.article.findUnique({ where: { id: articleId }, select: { id: true } });
      if (!article) throw new HttpError(404, "Article not found");

      const removed = await tx.articleLike.deleteMany({ where: { articleId, userId } });
      if (removed.count > 0) {
        const a = await tx.article.update({
          where: { id: articleId },
          data: { likesCount: { decrement: 1 } },
          select: { likesCount: true },
        });
        return { liked: false, likesCount: a.likesCount };
      }

      await tx.articleLike.create({ data: { articleId, userId } });
      const a = await tx.article.update({
        where: { id: articleId },
        data: { likesCount: { increment: 1 } },
        select: { likesCount: true },
      });
      return { liked: true, likesCount: a.likesCount };
    });
  } catch (err) {
    // two rapid clicks racing each other
    if (isUniqueViolation(err)) throw new HttpError(409, "Please try again");
    throw err;
  }
}