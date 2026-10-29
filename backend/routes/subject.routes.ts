import { Router } from "express";
import rateLimit from "express-rate-limit";
import { joinByCode, joinPublic, leave, listMine, listPublic } from "../controllers/subject.controller";
import { validate } from "../middlewares/validate";
import { requireRole } from "../middlewares/role";
import { joinByCodeSchema } from "../utils/learning.validators";

const router = Router();

// guards against brute-forcing subject codes
const codeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "Too many attempts. Please try again later." },
});

router.get("/mine", listMine);
router.get("/public", listPublic);

const studentOnly = requireRole("STUDENT");
router.post("/join", studentOnly, codeLimiter, validate(joinByCodeSchema), joinByCode);
router.post("/:id/join", studentOnly, joinPublic);
router.delete("/:id/leave", studentOnly, leave);

export default router;