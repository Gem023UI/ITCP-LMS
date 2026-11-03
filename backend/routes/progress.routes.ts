import { Router } from "express";
import {
  completeChapter,
  getChapter,
  getHome,
  quizStats,
  saveChapter,
} from "../controllers/progress.controller";
import { validate } from "../middlewares/validate";
import { saveProgressSchema } from "../utils/progress.validators";

const router = Router();

router.get("/home", getHome);
router.get("/quiz-stats", quizStats);
router.get("/chapters/:chapterId", getChapter);
router.put("/chapters/:chapterId", validate(saveProgressSchema), saveChapter);
router.post("/chapters/:chapterId/complete", completeChapter);

export default router;
