import { Router } from "express";
import { teacher } from "../controllers/dashboard.controller";

const router = Router();

router.get("/teacher", teacher);

export default router;
