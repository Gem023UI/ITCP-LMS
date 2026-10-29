import { Router } from "express";
import { listUsers, setStatus } from "../controllers/admin.controller";
import { validate } from "../middlewares/validate";
import { setStatusSchema } from "../utils/manage.validators";

const router = Router();

router.get("/users", listUsers); // ?role=TEACHER|STUDENT
router.patch("/users/:id/status", validate(setStatusSchema), setStatus);

export default router;