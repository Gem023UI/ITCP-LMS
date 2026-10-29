import bcrypt from "bcryptjs";
import { prisma } from "../utils/prisma";

const SALT_ROUNDS = 12;
// compared against when the ID doesn't exist, so response time doesn't leak it
const DUMMY_HASH = bcrypt.hashSync("timing-equalizer", SALT_ROUNDS);

export class AuthError extends Error {
  status: number;
  errors?: Record<string, string>;
  constructor(status: number, message: string, errors?: Record<string, string>) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

type DbUser = {
  id: string;
  tuptId: string;
  email: string;
  role: string;
  status: string;
  createdAt: Date;
};

export const toPublicUser = (u: DbUser) => ({
  id: u.id,
  tuptId: u.tuptId,
  email: u.email,
  role: u.role,
  status: u.status,
  createdAt: u.createdAt,
});

export async function registerUser(tuptId: string, email: string, password: string) {
  const existing = await prisma.user.findMany({
    where: { OR: [{ tuptId }, { email }] },
    select: { tuptId: true, email: true },
  });
  if (existing.length > 0) {
    const errors: Record<string, string> = {};
    for (const u of existing) {
      if (u.tuptId === tuptId) errors.tuptId = "TUPT ID already registered";
      if (u.email === email) errors.email = "Email already registered";
    }
    throw new AuthError(409, "Account already exists", errors);
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  try {
    const user = await prisma.user.create({ data: { tuptId, email, passwordHash } });
    return toPublicUser(user);
  } catch (err) {
    // P2002 = unique violation (a concurrent request won the race)
    if (typeof err === "object" && err !== null && "code" in err && err.code === "P2002") {
      throw new AuthError(409, "TUPT ID or email already registered");
    }
    throw err;
  }
}

export async function loginUser(tuptId: string, password: string) {
  const user = await prisma.user.findUnique({ where: { tuptId } });
  const ok = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH);
  if (!user || !ok) throw new AuthError(401, "Invalid TUPT ID or password");
  if (user.status === "INACTIVE")
    throw new AuthError(403, "Your account is inactive. Please contact your administrator.");
  if (user.status === "DEACTIVATED")
    throw new AuthError(403, "Your account has been deactivated.");
  return toPublicUser(user);
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new AuthError(401, "Session expired");
  return toPublicUser(user);
}