import { RequestHandler, Router } from "express";
import { patientsController } from "../controllers";
import { newPatientSchema } from "../utils/schemas";

const router = Router();

const newPatientParser: RequestHandler = (req, _res, next) => {
  newPatientSchema.parse(req.body);

  next();
};

router.get("/", patientsController.getPatients);
router.post("/", newPatientParser, patientsController.addPatient);

export default router;
