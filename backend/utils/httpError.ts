import { AuthError } from "../services/auth.service";

// extends AuthError so the existing errorHandler already formats it
export class HttpError extends AuthError {}