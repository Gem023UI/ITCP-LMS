import { randomInt } from "node:crypto";

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I

// used by the upcoming create-subject feature
export const generateSubjectCode = (length = 6) =>
  Array.from({ length }, () => ALPHABET[randomInt(ALPHABET.length)]).join("");