import { Router } from "express";
import { get, getByDifficult } from "../controllers/sudokuController.js";

const router = Router();

router.get("/", get);
router.get("/:difficult", getByDifficult);

export default router;
