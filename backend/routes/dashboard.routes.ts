import { Router } from "express";
import { admin, teacher } from "../controllers/dashboard.controller";
import { requireRole } from "../middlewares/role";

const router = Router();

router.get("/teacher", requireRole("TEACHER"), teacher);
router.get("/admin", requireRole("ADMIN"), admin);

export default router;
