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
  tuptId: string | null;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl: string | null;
  role: string;
  status: string;
  createdAt: Date;
};

export const toPublicUser = (u: DbUser) => ({
  id: u.id,
  tuptId: u.tuptId,
  email: u.email,
  firstName: u.firstName,
  lastName: u.lastName,
  imageUrl: u.imageUrl,
  role: u.role,
  status: u.status,
  createdAt: u.createdAt,
});

export async function registerUser(
  tuptId: string,
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  role: "STUDENT" | "TEACHER",
) {
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
    const user = await prisma.user.create({
      data: {
        tuptId,
        email,
        passwordHash,
        firstName,
        lastName,
        role,
        status: "VERIFY",
        ...(role === "TEACHER" ? { teacher: { create: {} } } : { student: { create: {} } }),
      },
    });
    return toPublicUser(user);
  } catch (err) {
    // P2002 = unique violation (a concurrent request won the race)
    if (typeof err === "object" && err !== null && "code" in err && err.code === "P2002") {
      throw new AuthError(409, "TUPT ID or email already registered");
    }
    throw err;
  }
}

export async function loginUser(identifier: string, password: string) {
  const user = await prisma.user.findFirst({
    where: { OR: [{ tuptId: identifier }, { email: identifier }] },
  });
  const ok = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH);
  if (!user || !ok) throw new AuthError(401, "Invalid TUPT ID/email or password");
  if (user.status === "VERIFY")
    throw new AuthError(
      403,
      "Your account is pending approval. You can log in once an administrator activates it.",
    );
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