import { Router } from "express";
import * as c from "../controllers/manage.controller";
import { requireRole } from "../middlewares/role";
import { validate } from "../middlewares/validate";
import {
  chapterInputSchema,
  quizInputSchema,
  subjectInputSchema,
} from "../utils/manage.validators";

const router = Router();
const teacherOnly = requireRole("TEACHER"); // creating is teacher-only; admin can only edit/delete

router.get("/subjects", c.listSubjects);
router.post("/subjects", teacherOnly, validate(subjectInputSchema), c.createSubject);
router.get("/subjects/:id", c.getSubject);
router.put("/subjects/:id", validate(subjectInputSchema), c.updateSubject);
router.delete("/subjects/:id", c.deleteSubject);

router.post("/subjects/:id/chapters", teacherOnly, validate(chapterInputSchema), c.createChapter);
router.get("/chapters/:id", c.getChapter);
router.put("/chapters/:id", validate(chapterInputSchema), c.updateChapter);
router.delete("/chapters/:id", c.deleteChapter);

router.get("/chapters/:id/quiz", c.getQuiz);
router.put("/chapters/:id/quiz", validate(quizInputSchema), c.saveQuiz);
router.delete("/chapters/:id/quiz", c.deleteQuiz);

export default router;