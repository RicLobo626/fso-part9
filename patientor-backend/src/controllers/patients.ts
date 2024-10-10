import { Request, RequestHandler, Response } from "express";
import { NewPatient, PublicPatient } from "../types";
import { patientService } from "../services";

export const getPatients: RequestHandler = (_req, res: Response<PublicPatient[]>) => {
  const publicPatients = patientService.getPublicPatients();

  res.json(publicPatients);
};

export const addPatient: RequestHandler = (
  req: Request<unknown, unknown, NewPatient>,
  res: Response<PublicPatient>
) => {
  const addedPatient = patientService.addPatient(req.body);

  res.json(addedPatient);
};

export default {
  getPatients,
  addPatient,
};
