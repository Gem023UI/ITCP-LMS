import bcrypt from "bcryptjs";
import { prisma } from "../utils/prisma";

const SALT_ROUNDS = 12;
// compared against when the email doesn't exist, so response time doesn't leak it
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

type DbUser = { id: string; email: string; role: string; createdAt: Date };

export const toPublicUser = (u: DbUser) => ({
  id: u.id,
  email: u.email,
  role: u.role,
  createdAt: u.createdAt,
});

export async function registerUser(email: string, password: string) {
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  try {
    const user = await prisma.user.create({ data: { email, passwordHash } });
    return toPublicUser(user);
  } catch (err) {
    // P2002 = unique constraint violation (email already exists)
    if (typeof err === "object" && err !== null && "code" in err && err.code === "P2002") {
      throw new AuthError(409, "Email already registered", {
        email: "Email already registered",
      });
    }
    throw err;
  }
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  const ok = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH);
  if (!user || !ok) throw new AuthError(401, "Invalid email or password");
  return toPublicUser(user);
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new AuthError(401, "Session expired");
  return toPublicUser(user);
}