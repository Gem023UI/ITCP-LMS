import { Router } from "express";
import * as c from "../controllers/manage.controller";
import { requireRole } from "../middlewares/role";
import { validate } from "../middlewares/validate";
import {
  chapterInputSchema,
  quizDeadlineSchema,
  quizInputSchema,
  subjectInputSchema,
} from "../utils/manage.validators";

const router = Router();
const teacherOnly = requireRole("TEACHER"); // creating is teacher-only; admin can only edit/delete subjects and chapters

router.get("/subjects", c.listSubjects);
router.post("/subjects", teacherOnly, validate(subjectInputSchema), c.createSubject);
router.get("/subjects/:id", c.getSubject);
router.put("/subjects/:id", validate(subjectInputSchema), c.updateSubject);
router.delete("/subjects/:id", c.deleteSubject);

router.post("/subjects/:id/chapters", teacherOnly, validate(chapterInputSchema), c.createChapter);
router.get("/chapters/:id", c.getChapter);
router.put("/chapters/:id", validate(chapterInputSchema), c.updateChapter);
router.delete("/chapters/:id", c.deleteChapter);

// quizzes belong to a subject; only the owning teacher can see or change them (admins can't)
router.get("/subjects/:id/quizzes", teacherOnly, c.listQuizzes);
router.get("/subjects/:id/quiz-defaults", teacherOnly, c.quizDefaults);
router.post("/subjects/:id/quizzes", teacherOnly, validate(quizInputSchema), c.createQuiz);
router.get("/quizzes/:id", teacherOnly, c.getQuiz);
router.put("/quizzes/:id", teacherOnly, validate(quizInputSchema), c.updateQuiz);
router.patch("/quizzes/:id/deadline", teacherOnly, validate(quizDeadlineSchema), c.updateDeadline);
router.delete("/quizzes/:id", teacherOnly, c.deleteQuiz);

export default router;
