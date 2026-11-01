import { Router } from "express";
import * as c from "../controllers/article.controller";
import { requireRole } from "../middlewares/role";
import { validate } from "../middlewares/validate";
import { articleInputSchema } from "../utils/article.validators";

const router = Router();
const authorsOnly = requireRole("TEACHER", "STUDENT"); // ADMIN cannot publish

router.get("/", c.list); // ?page=&limit=&sort=latest|popular&authorId=
router.post("/", authorsOnly, validate(articleInputSchema), c.create);
router.get("/:id", c.getOne);
router.put("/:id", authorsOnly, validate(articleInputSchema), c.update); // author only (checked in service)
router.delete("/:id", c.remove); // author or ADMIN (checked in service)
router.post("/:id/like", c.toggleLike); // toggles like / unlike

export default router;