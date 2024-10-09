import { Router } from "express";
import { diagnosesController } from "../controllers";

const router = Router();

router.get("/", diagnosesController.getDiagnoses);

export default router;
