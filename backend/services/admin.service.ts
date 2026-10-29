import { prisma } from "../utils/prisma";
import { HttpError } from "../utils/httpError";

const userSelect = {
  id: true,
  tuptId: true,
  email: true,
  role: true,
  status: true,
  createdAt: true,
} as const;

export async function listUsers(role?: "TEACHER" | "STUDENT") {
  return prisma.user.findMany({
    where: { role: role ?? { in: ["TEACHER", "STUDENT"] } },
    orderBy: { createdAt: "desc" },
    select: userSelect,
  });
}

export async function setUserStatus(
  actorId: string,
  targetId: string,
  status: "ACTIVE" | "INACTIVE" | "DEACTIVATED",
) {
  if (actorId === targetId) throw new HttpError(400, "You can't change your own status");
  const target = await prisma.user.findUnique({ where: { id: targetId }, select: { role: true } });
  if (!target) throw new HttpError(404, "User not found");
  if (target.role === "ADMIN") throw new HttpError(403, "Admin accounts can't be changed here");
  return prisma.user.update({ where: { id: targetId }, data: { status }, select: userSelect });
}