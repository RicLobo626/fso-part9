import { Router } from "express";
import diagnosesController from "../controllers/diagnoses";

const router = Router();

router.get("/", diagnosesController.getDiagnoses);

export default router;
