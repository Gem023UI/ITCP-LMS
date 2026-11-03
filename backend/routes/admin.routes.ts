import { Router } from "express";
import { listSubjectChapters, listSubjects, listUsers, setStatus } from "../controllers/admin.controller";import { validate } from "../middlewares/validate";
import { setStatusSchema } from "../utils/manage.validators";

const router = Router();

router.get("/users", listUsers); // ?role=TEACHER|STUDENT
router.get("/subjects", listSubjects);
router.get("/subjects/:id/chapters", listSubjectChapters);
router.patch("/users/:id/status", validate(setStatusSchema), setStatus);

export default router;