import { Router } from "express";
import { getOne, listBySubject } from "../controllers/chapter.controller";

const router = Router();

router.get("/", listBySubject); // GET /api/chapters?subjectId=...
router.get("/:id", getOne);

export default router;