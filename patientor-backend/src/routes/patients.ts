import { Router } from "express";
import { patientsController } from "../controllers";
import { newEntryParser, newPatientParser } from "../utils/middleware";

const router = Router();

router.get("/", patientsController.getPatients);
router.post("/", newPatientParser, patientsController.addPatient);

router.get("/:id", patientsController.getPatient);
router.post("/:id/entries", newEntryParser, patientsController.addEntry);

export default router;
