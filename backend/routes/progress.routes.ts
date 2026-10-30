import { Router } from "express";
import { getChapter, getHome, saveChapter } from "../controllers/progress.controller";
import { validate } from "../middlewares/validate";
import { saveProgressSchema } from "../utils/progress.validators";

const router = Router();

router.get("/home", getHome);
router.get("/chapters/:chapterId", getChapter);
router.put("/chapters/:chapterId", validate(saveProgressSchema), saveChapter);

export default router;