import { Router } from "express";
import { requireAuth } from "../middlewares/auth";
import { requireActive } from "../middlewares/active";
import { requireRole } from "../middlewares/role";
import subjectRoutes from "./subject.routes";
import chapterRoutes from "./chapter.routes";
import quizRoutes from "./quiz.routes";
import manageRoutes from "./manage.routes";
import adminRoutes from "./admin.routes";
import progressRoutes from "./progress.routes";

const router = Router();

// every route checks the account status first
const guard = [requireAuth, requireActive];

router.use("/subjects", ...guard, subjectRoutes);
router.use("/chapters", ...guard, chapterRoutes);
router.use("/quizzes", ...guard, quizRoutes);
router.use("/progress", ...guard, requireRole("STUDENT"), progressRoutes);
router.use("/manage", ...guard, requireRole("TEACHER", "ADMIN"), manageRoutes);
router.use("/admin", ...guard, requireRole("ADMIN"), adminRoutes);

export default router;