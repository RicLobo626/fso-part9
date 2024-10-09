import { Router } from "express";
import { patientsController } from "../controllers";

const router = Router();

router.get("/", patientsController.getPatients);

export default router;
