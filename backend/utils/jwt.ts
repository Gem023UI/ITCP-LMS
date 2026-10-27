import jwt from "jsonwebtoken";
import { env } from "./env";

export type TokenPayload = { sub: string; role: string };

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, env.JWT_SECRET, {
    algorithms: ["HS256"],
  }) as unknown as TokenPayload;
}