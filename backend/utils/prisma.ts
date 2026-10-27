import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { env } from "./env";

const isLocal = /localhost|127\.0\.0\.1/.test(env.DATABASE_URL);

const adapter = new PrismaPg({
  connectionString: env.DATABASE_URL,
  // Supabase requires TLS; local Postgres doesn't
  ssl: isLocal ? false : { rejectUnauthorized: false },
});

export const prisma = new PrismaClient({ adapter });