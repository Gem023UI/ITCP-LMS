import { Router } from "express";
import { getOne, list, submit } from "../controllers/quiz.controller";
import { validate } from "../middlewares/validate";
import { requireRole } from "../middlewares/role";
import { submitQuizSchema } from "../utils/learning.validator";

const router = Router();

router.get("/", requireRole("STUDENT"), list); // due today / upcoming / missed / completed
router.get("/:quizId", getOne);
router.post("/:quizId/submit", requireRole("STUDENT"), validate(submitQuizSchema), submit);

export default router;
