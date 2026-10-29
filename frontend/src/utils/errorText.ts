import { ApiError } from "../services/authApi";

export const errText = (e: unknown) => {
  if (e instanceof ApiError) {
    const first = Object.entries(e.fieldErrors)[0];
    return first ? `${first[0]}: ${first[1]}` : e.message;
  }
  return e instanceof Error ? e.message : "Something went wrong";
};