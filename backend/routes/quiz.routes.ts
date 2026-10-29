import { Router } from "express";
import { getByChapter, submit } from "../controllers/quiz.controller";
import { validate } from "../middlewares/validate";
import { requireRole } from "../middlewares/role";
import { submitQuizSchema } from "../utils/learning.validator";

const router = Router();

router.get("/chapter/:chapterId", getByChapter);
router.post("/chapter/:chapterId/submit", requireRole("STUDENT"), validate(submitQuizSchema), submit);

export default router;