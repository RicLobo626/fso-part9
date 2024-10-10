import { Router } from "express";
import { patientsController } from "../controllers";
import { newPatientParser } from "../utils/middleware";

const router = Router();

router.get("/", patientsController.getPatients);
router.post("/", newPatientParser, patientsController.addPatient);

export default router;
